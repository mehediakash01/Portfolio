import { useEffect, useRef, useState } from "react";

const DEFAULT_PALETTE = {
  base: "#050816",
  deep: "#09101d",
  primary: "#00ADB5",
  secondary: "#007CFF",
  surface: "#16213e",
};

const DEFAULT_SETTINGS = {
  mouseForce: 20,
  cursorSize: 100,
  resolution: 0.5,
  autoSpeed: 0.5,
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const lerp = (start, end, amount) => start + (end - start) * amount;

const hexToRgb = (hex) => {
  const value = hex.replace("#", "");
  const normalized =
    value.length === 3
      ? value
          .split("")
          .map((channel) => channel + channel)
          .join("")
      : value;

  return [
    parseInt(normalized.slice(0, 2), 16) / 255,
    parseInt(normalized.slice(2, 4), 16) / 255,
    parseInt(normalized.slice(4, 6), 16) / 255,
  ];
};

const mixColor = (first, second, amount) =>
  first.map((channel, index) => lerp(channel, second[index], amount));

const VERTEX_SHADER = `#version 300 es
precision highp float;

layout (location = 0) in vec2 aPosition;

out vec2 vUv;

void main() {
  vUv = 0.5 * (aPosition + 1.0);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const COPY_SHADER = `#version 300 es
precision highp float;

in vec2 vUv;

uniform sampler2D uTexture;

out vec4 fragColor;

void main() {
  fragColor = texture(uTexture, vUv);
}
`;

const CLEAR_SHADER = `#version 300 es
precision highp float;

in vec2 vUv;

uniform sampler2D uTexture;
uniform float uValue;

out vec4 fragColor;

void main() {
  fragColor = texture(uTexture, vUv) * uValue;
}
`;

const SPLAT_SHADER = `#version 300 es
precision highp float;

in vec2 vUv;

uniform sampler2D uTarget;
uniform vec2 uPoint;
uniform vec3 uColor;
uniform float uRadius;
uniform float uAspect;

out vec4 fragColor;

void main() {
  vec2 offset = vUv - uPoint;
  offset.x *= uAspect;

  vec3 splat = uColor * exp(-dot(offset, offset) / max(uRadius, 0.00001));
  vec3 base = texture(uTarget, vUv).rgb;

  fragColor = vec4(base + splat, 1.0);
}
`;

const ADVECTION_SHADER = `#version 300 es
precision highp float;

in vec2 vUv;

uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 uTexelSize;
uniform float uDt;
uniform float uDissipation;

out vec4 fragColor;

void main() {
  vec2 coord = vUv - uDt * texture(uVelocity, vUv).xy * uTexelSize;
  fragColor = uDissipation * texture(uSource, coord);
}
`;

const DIVERGENCE_SHADER = `#version 300 es
precision highp float;

in vec2 vUv;

uniform sampler2D uVelocity;
uniform vec2 uTexelSize;

out vec4 fragColor;

void main() {
  vec2 left = texture(uVelocity, vUv - vec2(uTexelSize.x, 0.0)).xy;
  vec2 right = texture(uVelocity, vUv + vec2(uTexelSize.x, 0.0)).xy;
  vec2 bottom = texture(uVelocity, vUv - vec2(0.0, uTexelSize.y)).xy;
  vec2 top = texture(uVelocity, vUv + vec2(0.0, uTexelSize.y)).xy;

  float divergence = 0.5 * (right.x - left.x + top.y - bottom.y);
  fragColor = vec4(divergence, 0.0, 0.0, 1.0);
}
`;

const CURL_SHADER = `#version 300 es
precision highp float;

in vec2 vUv;

uniform sampler2D uVelocity;
uniform vec2 uTexelSize;

out vec4 fragColor;

void main() {
  float left = texture(uVelocity, vUv - vec2(uTexelSize.x, 0.0)).y;
  float right = texture(uVelocity, vUv + vec2(uTexelSize.x, 0.0)).y;
  float bottom = texture(uVelocity, vUv - vec2(0.0, uTexelSize.y)).x;
  float top = texture(uVelocity, vUv + vec2(0.0, uTexelSize.y)).x;

  float curl = right - left - top + bottom;
  fragColor = vec4(curl, 0.0, 0.0, 1.0);
}
`;

const VORTICITY_SHADER = `#version 300 es
precision highp float;

in vec2 vUv;

uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform vec2 uTexelSize;
uniform float uCurlStrength;
uniform float uDt;

out vec4 fragColor;

void main() {
  float left = abs(texture(uCurl, vUv - vec2(uTexelSize.x, 0.0)).x);
  float right = abs(texture(uCurl, vUv + vec2(uTexelSize.x, 0.0)).x);
  float bottom = abs(texture(uCurl, vUv - vec2(0.0, uTexelSize.y)).x);
  float top = abs(texture(uCurl, vUv + vec2(0.0, uTexelSize.y)).x);
  float center = texture(uCurl, vUv).x;

  vec2 force = 0.5 * vec2(top - bottom, left - right);
  force /= max(length(force), 0.0001);
  force *= uCurlStrength * center;

  vec2 velocity = texture(uVelocity, vUv).xy;
  velocity += force * uDt;

  fragColor = vec4(velocity, 0.0, 1.0);
}
`;

const PRESSURE_SHADER = `#version 300 es
precision highp float;

in vec2 vUv;

uniform sampler2D uPressure;
uniform sampler2D uDivergence;
uniform vec2 uTexelSize;

out vec4 fragColor;

void main() {
  float left = texture(uPressure, vUv - vec2(uTexelSize.x, 0.0)).x;
  float right = texture(uPressure, vUv + vec2(uTexelSize.x, 0.0)).x;
  float bottom = texture(uPressure, vUv - vec2(0.0, uTexelSize.y)).x;
  float top = texture(uPressure, vUv + vec2(0.0, uTexelSize.y)).x;
  float divergence = texture(uDivergence, vUv).x;

  float pressure = (left + right + bottom + top - divergence) * 0.25;
  fragColor = vec4(pressure, 0.0, 0.0, 1.0);
}
`;

const GRADIENT_SUBTRACT_SHADER = `#version 300 es
precision highp float;

in vec2 vUv;

uniform sampler2D uPressure;
uniform sampler2D uVelocity;
uniform vec2 uTexelSize;

out vec4 fragColor;

void main() {
  float left = texture(uPressure, vUv - vec2(uTexelSize.x, 0.0)).x;
  float right = texture(uPressure, vUv + vec2(uTexelSize.x, 0.0)).x;
  float bottom = texture(uPressure, vUv - vec2(0.0, uTexelSize.y)).x;
  float top = texture(uPressure, vUv + vec2(0.0, uTexelSize.y)).x;

  vec2 velocity = texture(uVelocity, vUv).xy;
  velocity -= 0.5 * vec2(right - left, top - bottom);

  fragColor = vec4(velocity, 0.0, 1.0);
}
`;

const DIFFUSION_SHADER = `#version 300 es
precision highp float;

in vec2 vUv;

uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 uTexelSize;
uniform float uAlpha;
uniform float uBeta;

out vec4 fragColor;

void main() {
  vec2 left = texture(uVelocity, vUv - vec2(uTexelSize.x, 0.0)).xy;
  vec2 right = texture(uVelocity, vUv + vec2(uTexelSize.x, 0.0)).xy;
  vec2 bottom = texture(uVelocity, vUv - vec2(0.0, uTexelSize.y)).xy;
  vec2 top = texture(uVelocity, vUv + vec2(0.0, uTexelSize.y)).xy;
  vec2 source = texture(uSource, vUv).xy;

  vec2 velocity = (source + uAlpha * (left + right + bottom + top)) / uBeta;
  fragColor = vec4(velocity, 0.0, 1.0);
}
`;

const DISPLAY_SHADER = `#version 300 es
precision highp float;

in vec2 vUv;

uniform sampler2D uDensity;
uniform sampler2D uVelocity;
uniform vec2 uTexelSize;
uniform vec2 uResolution;
uniform vec3 uBaseColor;
uniform vec3 uDeepColor;
uniform vec3 uGlowColor;
uniform vec3 uHighlightColor;
uniform float uTime;

out vec4 fragColor;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 cell = floor(p);
  vec2 local = fract(p);
  vec2 eased = local * local * (3.0 - 2.0 * local);

  float a = hash(cell);
  float b = hash(cell + vec2(1.0, 0.0));
  float c = hash(cell + vec2(0.0, 1.0));
  float d = hash(cell + vec2(1.0, 1.0));

  return mix(mix(a, b, eased.x), mix(c, d, eased.x), eased.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;

  for (int index = 0; index < 4; index += 1) {
    value += amplitude * noise(p);
    p = p * 2.02 + vec2(17.1, 9.2);
    amplitude *= 0.5;
  }

  return value;
}

float luma(vec3 color) {
  return dot(color, vec3(0.2126, 0.7152, 0.0722));
}

vec3 sampleDensity(vec2 uv) {
  return texture(uDensity, clamp(uv, vec2(0.0), vec2(1.0))).rgb;
}

void main() {
  vec2 uv = vUv;
  vec2 centered = uv - 0.5;
  centered.x *= uResolution.x / uResolution.y;

  vec3 density = sampleDensity(uv);
  vec3 blur = vec3(0.0);
  blur += sampleDensity(uv + uTexelSize * vec2(2.0, 0.0));
  blur += sampleDensity(uv - uTexelSize * vec2(2.0, 0.0));
  blur += sampleDensity(uv + uTexelSize * vec2(0.0, 2.0));
  blur += sampleDensity(uv - uTexelSize * vec2(0.0, 2.0));
  blur += sampleDensity(uv + uTexelSize * vec2(4.0, 4.0));
  blur += sampleDensity(uv + uTexelSize * vec2(-4.0, 4.0));
  blur += sampleDensity(uv + uTexelSize * vec2(4.0, -4.0));
  blur += sampleDensity(uv + uTexelSize * vec2(-4.0, -4.0));
  blur /= 8.0;

  vec3 wide = vec3(0.0);
  wide += sampleDensity(uv + uTexelSize * vec2(9.0, 0.0));
  wide += sampleDensity(uv - uTexelSize * vec2(9.0, 0.0));
  wide += sampleDensity(uv + uTexelSize * vec2(0.0, 9.0));
  wide += sampleDensity(uv - uTexelSize * vec2(0.0, 9.0));
  wide /= 4.0;

  vec2 velocity = texture(uVelocity, uv).xy;
  float energy = length(velocity);
  float bloom = luma(blur);
  float aura = luma(wide);

  float edge = 0.0;
  edge += length(sampleDensity(uv + uTexelSize * vec2(1.5, 0.0)) - sampleDensity(uv - uTexelSize * vec2(1.5, 0.0)));
  edge += length(sampleDensity(uv + uTexelSize * vec2(0.0, 1.5)) - sampleDensity(uv - uTexelSize * vec2(0.0, 1.5)));

  float atmosphere = fbm(vec2(centered.x * 1.85 + 3.5, uv.y * 2.6 - uTime * 0.02));
  float haze = fbm(vec2(uv.x * 3.4 - uTime * 0.015, centered.y * 3.1 + 2.0));
  float vignette = 1.0 - smoothstep(0.45, 1.15, length(centered));
  float centerWell = 1.0 - smoothstep(0.0, 0.52, length(centered * vec2(0.84, 1.16)));

  vec3 base = mix(uBaseColor, uDeepColor, smoothstep(0.0, 1.0, uv.y));
  base += (0.028 + 0.02 * uv.y) * atmosphere;
  base += 0.012 * haze * uGlowColor;

  vec3 fluid = density * (1.15 + bloom * 1.8);
  fluid += blur * 0.85;
  fluid += wide * 0.55;
  fluid += density * edge * 1.25;
  fluid += uHighlightColor * 0.16 * smoothstep(0.05, 1.25, bloom + aura * 0.7 + energy * 0.0014);
  fluid += mix(uHighlightColor * 0.05, uGlowColor * 0.1, atmosphere) * smoothstep(0.08, 0.95, aura + bloom * 0.8);

  vec3 color = base + fluid * vignette;
  color = mix(color, color * 0.72, centerWell * 0.24);
  color += uGlowColor * 0.035 * vignette;

  fragColor = vec4(color, 1.0);
}
`;

const createShader = (gl, type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(info || "Shader compilation failed.");
  }

  return shader;
};

const createProgram = (gl, vertexSource, fragmentSource) => {
  const program = gl.createProgram();
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    throw new Error(info || "Program linking failed.");
  }

  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  return program;
};

const createFBO = (gl, width, height, filter) => {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA16F,
    width,
    height,
    0,
    gl.RGBA,
    gl.HALF_FLOAT,
    null,
  );

  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

  return { texture, fbo, width, height };
};

const createDoubleFBO = (gl, width, height, filter) => {
  let read = createFBO(gl, width, height, filter);
  let write = createFBO(gl, width, height, filter);

  return {
    get read() {
      return read;
    },
    get write() {
      return write;
    },
    swap() {
      const next = read;
      read = write;
      write = next;
    },
  };
};

const deleteFBO = (gl, target) => {
  if (!target) {
    return;
  }

  gl.deleteTexture(target.texture);
  gl.deleteFramebuffer(target.fbo);
};

const deleteDoubleFBO = (gl, target) => {
  if (!target) {
    return;
  }

  deleteFBO(gl, target.read);
  deleteFBO(gl, target.write);
};

const createUniformMap = (gl, program, uniforms) =>
  Object.fromEntries(uniforms.map((name) => [name, gl.getUniformLocation(program, name)]));

const getFluidConfig = (width) => {
  const compact = width < 768;

  return {
    mouseForce: DEFAULT_SETTINGS.mouseForce,
    cursorSize: compact ? 84 : DEFAULT_SETTINGS.cursorSize,
    resolution: compact ? 0.35 : DEFAULT_SETTINGS.resolution,
    autoSpeed: DEFAULT_SETTINGS.autoSpeed,
    curlStrength: compact ? 16 : 22,
    viscosity: compact ? 0.18 : 0.24,
    viscosityIterations: compact ? 7 : 9,
    pressureIterations: compact ? 12 : 18,
    velocityDissipation: compact ? 0.987 : 0.989,
    densityDissipation: compact ? 0.992 : 0.994,
    autoForce: compact ? 0.38 : 0.44,
  };
};

const LiquidEtherBackground = ({
  className = "",
  palette = DEFAULT_PALETTE,
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) {
      return undefined;
    }

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
    });

    if (!gl || !gl.getExtension("EXT_color_buffer_float")) {
      setIsSupported(false);
      return undefined;
    }

    const supportsLinearFiltering = Boolean(gl.getExtension("OES_texture_float_linear"));
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const paletteValues = {
      base: hexToRgb(palette.base),
      deep: hexToRgb(palette.deep),
      primary: hexToRgb(palette.primary),
      secondary: hexToRgb(palette.secondary),
      surface: hexToRgb(palette.surface),
    };
    const highlightColor = mixColor(paletteValues.secondary, [0.96, 0.99, 1], 0.35);
    const auraColor = mixColor(paletteValues.primary, paletteValues.secondary, 0.58);

    let displayWidth = 0;
    let displayHeight = 0;
    let logicalWidth = 0;
    let logicalHeight = 0;
    let simWidth = 0;
    let simHeight = 0;
    let dyeWidth = 0;
    let dyeHeight = 0;
    let config = getFluidConfig(1280);

    let velocity = null;
    let velocitySource = null;
    let dye = null;
    let pressure = null;
    let divergence = null;
    let curl = null;

    let disposed = false;
    let animationFrameId = 0;
    let resizeObserver = null;
    let lastFrameTime = performance.now();

    const pointer = {
      active: false,
      down: false,
      x: 0.5,
      y: 0.52,
      initialized: false,
      lastMove: performance.now(),
    };

    const autoTrail = {
      initialized: false,
      lastEmit: 0,
      x: 0.5,
      y: 0.5,
    };

    const splatQueue = [];

    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const quadVao = gl.createVertexArray();
    gl.bindVertexArray(quadVao);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const programs = {
      copy: createProgram(gl, VERTEX_SHADER, COPY_SHADER),
      clear: createProgram(gl, VERTEX_SHADER, CLEAR_SHADER),
      splat: createProgram(gl, VERTEX_SHADER, SPLAT_SHADER),
      advection: createProgram(gl, VERTEX_SHADER, ADVECTION_SHADER),
      divergence: createProgram(gl, VERTEX_SHADER, DIVERGENCE_SHADER),
      curl: createProgram(gl, VERTEX_SHADER, CURL_SHADER),
      vorticity: createProgram(gl, VERTEX_SHADER, VORTICITY_SHADER),
      pressure: createProgram(gl, VERTEX_SHADER, PRESSURE_SHADER),
      gradientSubtract: createProgram(gl, VERTEX_SHADER, GRADIENT_SUBTRACT_SHADER),
      diffusion: createProgram(gl, VERTEX_SHADER, DIFFUSION_SHADER),
      display: createProgram(gl, VERTEX_SHADER, DISPLAY_SHADER),
    };

    const uniforms = {
      copy: createUniformMap(gl, programs.copy, ["uTexture"]),
      clear: createUniformMap(gl, programs.clear, ["uTexture", "uValue"]),
      splat: createUniformMap(gl, programs.splat, [
        "uTarget",
        "uPoint",
        "uColor",
        "uRadius",
        "uAspect",
      ]),
      advection: createUniformMap(gl, programs.advection, [
        "uVelocity",
        "uSource",
        "uTexelSize",
        "uDt",
        "uDissipation",
      ]),
      divergence: createUniformMap(gl, programs.divergence, ["uVelocity", "uTexelSize"]),
      curl: createUniformMap(gl, programs.curl, ["uVelocity", "uTexelSize"]),
      vorticity: createUniformMap(gl, programs.vorticity, [
        "uVelocity",
        "uCurl",
        "uTexelSize",
        "uCurlStrength",
        "uDt",
      ]),
      pressure: createUniformMap(gl, programs.pressure, [
        "uPressure",
        "uDivergence",
        "uTexelSize",
      ]),
      gradientSubtract: createUniformMap(gl, programs.gradientSubtract, [
        "uPressure",
        "uVelocity",
        "uTexelSize",
      ]),
      diffusion: createUniformMap(gl, programs.diffusion, [
        "uVelocity",
        "uSource",
        "uTexelSize",
        "uAlpha",
        "uBeta",
      ]),
      display: createUniformMap(gl, programs.display, [
        "uDensity",
        "uVelocity",
        "uTexelSize",
        "uResolution",
        "uBaseColor",
        "uDeepColor",
        "uGlowColor",
        "uHighlightColor",
        "uTime",
      ]),
    };

    const bindTexture = (texture, unit) => {
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, texture);
    };

    const blit = (target) => {
      if (target) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
        gl.viewport(0, 0, target.width, target.height);
      } else {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, displayWidth, displayHeight);
      }

      gl.bindVertexArray(quadVao);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const clearTarget = (target) => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      gl.viewport(0, 0, target.width, target.height);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
    };

    const destroyFramebuffers = () => {
      deleteDoubleFBO(gl, velocity);
      deleteFBO(gl, velocitySource);
      deleteDoubleFBO(gl, dye);
      deleteDoubleFBO(gl, pressure);
      deleteFBO(gl, divergence);
      deleteFBO(gl, curl);

      velocity = null;
      velocitySource = null;
      dye = null;
      pressure = null;
      divergence = null;
      curl = null;
    };

    const initFramebuffers = () => {
      destroyFramebuffers();

      const linear = supportsLinearFiltering ? gl.LINEAR : gl.NEAREST;

      velocity = createDoubleFBO(gl, simWidth, simHeight, linear);
      velocitySource = createFBO(gl, simWidth, simHeight, linear);
      dye = createDoubleFBO(gl, dyeWidth, dyeHeight, linear);
      pressure = createDoubleFBO(gl, simWidth, simHeight, gl.NEAREST);
      divergence = createFBO(gl, simWidth, simHeight, gl.NEAREST);
      curl = createFBO(gl, simWidth, simHeight, gl.NEAREST);

      clearTarget(velocity.read);
      clearTarget(velocity.write);
      clearTarget(velocitySource);
      clearTarget(dye.read);
      clearTarget(dye.write);
      clearTarget(pressure.read);
      clearTarget(pressure.write);
      clearTarget(divergence);
      clearTarget(curl);
    };

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      logicalWidth = Math.max(1, Math.round(rect.width));
      logicalHeight = Math.max(1, Math.round(rect.height));

      const nextWidth = Math.max(1, Math.round(logicalWidth * dpr));
      const nextHeight = Math.max(1, Math.round(logicalHeight * dpr));

      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth;
        canvas.height = nextHeight;
      }

      displayWidth = nextWidth;
      displayHeight = nextHeight;

      config = getFluidConfig(logicalWidth);

      const nextSimWidth = Math.max(
        160,
        Math.min(960, Math.round(logicalWidth * config.resolution)),
      );
      const nextSimHeight = Math.max(
        160,
        Math.min(960, Math.round(logicalHeight * config.resolution)),
      );
      const nextDyeWidth = Math.max(
        240,
        Math.min(1440, Math.round(logicalWidth * Math.min(0.82, config.resolution + 0.28))),
      );
      const nextDyeHeight = Math.max(
        240,
        Math.min(1440, Math.round(logicalHeight * Math.min(0.82, config.resolution + 0.28))),
      );

      if (
        nextSimWidth !== simWidth ||
        nextSimHeight !== simHeight ||
        nextDyeWidth !== dyeWidth ||
        nextDyeHeight !== dyeHeight
      ) {
        simWidth = nextSimWidth;
        simHeight = nextSimHeight;
        dyeWidth = nextDyeWidth;
        dyeHeight = nextDyeHeight;
        initFramebuffers();
      }
    };

    const drawTexture = (program, texture, target) => {
      gl.useProgram(program);
      bindTexture(texture, 0);
      gl.uniform1i(uniforms.copy.uTexture, 0);
      blit(target);
    };

    const getRadius = (intensity = 0.35, expanded = false) => {
      const dominantSide = Math.max(logicalWidth || 1, logicalHeight || 1);
      const size = config.cursorSize * (expanded ? 1.16 : 0.9 + intensity * 0.55);
      const normalized = size / dominantSide;

      return Math.max(0.0012, normalized * normalized);
    };

    const sampleColor = (seed, intensity = 0.35) => {
      const firstMix = mixColor(
        paletteValues.primary,
        paletteValues.secondary,
        0.3 + 0.25 * Math.sin(seed * 3.8 + 0.8),
      );
      const secondMix = mixColor(
        paletteValues.primary,
        highlightColor,
        0.28 + 0.28 * Math.cos(seed * 2.4 + 1.1),
      );
      const composite = mixColor(
        firstMix,
        secondMix,
        0.45 + 0.25 * Math.sin(seed * 1.7 + intensity),
      );
      const glow = 0.52 + intensity * 0.88;

      return composite.map((channel) => channel * glow);
    };

    const enqueueSplat = (splat) => {
      splatQueue.push(splat);

      if (splatQueue.length > 80) {
        splatQueue.splice(0, splatQueue.length - 80);
      }
    };

    const emitTrail = (fromX, fromY, toX, toY, strengthBoost = 1) => {
      const deltaX = toX - fromX;
      const deltaY = toY - fromY;
      const distance = Math.hypot(deltaX * logicalWidth, deltaY * logicalHeight);

      if (distance < 0.5) {
        return;
      }

      const steps = Math.max(1, Math.ceil(distance / 18));
      const speed = clamp(distance / 180, 0.1, 1.3);
      const forceX = deltaX * simWidth * config.mouseForce * strengthBoost;
      const forceY = deltaY * simHeight * config.mouseForce * strengthBoost;
      const baseRadius = getRadius(speed, pointer.down);

      for (let index = 1; index <= steps; index += 1) {
        const progress = index / steps;
        const seed = performance.now() * 0.00018 + progress * 0.71;
        enqueueSplat({
          x: lerp(fromX, toX, progress),
          y: lerp(fromY, toY, progress),
          dx: forceX / steps,
          dy: forceY / steps,
          color: sampleColor(seed, speed),
          radius: baseRadius,
        });
      }
    };

    const applySplat = ({ x, y, dx, dy, color, radius }) => {
      const aspect = displayWidth / Math.max(displayHeight, 1);

      gl.useProgram(programs.splat);
      gl.uniform1f(uniforms.splat.uAspect, aspect);
      gl.uniform2f(uniforms.splat.uPoint, x, y);

      bindTexture(velocity.read.texture, 0);
      gl.uniform1i(uniforms.splat.uTarget, 0);
      gl.uniform3f(uniforms.splat.uColor, dx, dy, 0);
      gl.uniform1f(uniforms.splat.uRadius, radius * 0.92);
      blit(velocity.write);
      velocity.swap();

      bindTexture(dye.read.texture, 0);
      gl.uniform1i(uniforms.splat.uTarget, 0);
      gl.uniform3f(uniforms.splat.uColor, color[0], color[1], color[2]);
      gl.uniform1f(uniforms.splat.uRadius, radius);
      blit(dye.write);
      dye.swap();
    };

    const processSplats = () => {
      while (splatQueue.length) {
        applySplat(splatQueue.shift());
      }
    };

    const addAutoMotion = (timeSeconds) => {
      const idleFor = performance.now() - pointer.lastMove;

      if (idleFor < 1100) {
        autoTrail.initialized = false;
        return;
      }

      if (timeSeconds - autoTrail.lastEmit < 0.028) {
        return;
      }

      const phase = timeSeconds * config.autoSpeed;
      const nextX =
        0.5 +
        0.22 * Math.sin(phase * 0.75) +
        0.07 * Math.sin(phase * 1.9 + 1.1);
      const nextY =
        0.54 +
        0.16 * Math.cos(phase * 0.56 + 0.6) +
        0.05 * Math.sin(phase * 1.35);

      if (!autoTrail.initialized) {
        autoTrail.x = nextX;
        autoTrail.y = nextY;
        autoTrail.initialized = true;
        autoTrail.lastEmit = timeSeconds;
        return;
      }

      const deltaX = nextX - autoTrail.x;
      const deltaY = nextY - autoTrail.y;
      const baseRadius = getRadius(0.24, false) * 0.86;

      enqueueSplat({
        x: nextX,
        y: nextY,
        dx: deltaX * simWidth * config.mouseForce * config.autoForce,
        dy: deltaY * simHeight * config.mouseForce * config.autoForce,
        color: sampleColor(timeSeconds * 0.22 + 1.6, 0.22).map((channel) => channel * 0.48),
        radius: baseRadius,
      });

      enqueueSplat({
        x: 0.5 + (0.5 - nextX) * 0.86,
        y: 0.52 + (0.52 - nextY) * 0.92,
        dx: -deltaX * simWidth * config.mouseForce * config.autoForce * 0.52,
        dy: -deltaY * simHeight * config.mouseForce * config.autoForce * 0.52,
        color: sampleColor(timeSeconds * 0.18 + 3.2, 0.18).map((channel) => channel * 0.34),
        radius: baseRadius * 0.82,
      });

      autoTrail.x = nextX;
      autoTrail.y = nextY;
      autoTrail.lastEmit = timeSeconds;
    };

    const advect = (target, velocityTexture, sourceTexture, dt, dissipation) => {
      gl.useProgram(programs.advection);
      gl.uniform2f(uniforms.advection.uTexelSize, 1 / target.read.width, 1 / target.read.height);
      gl.uniform1f(uniforms.advection.uDt, dt);
      gl.uniform1f(uniforms.advection.uDissipation, dissipation);

      bindTexture(velocityTexture, 0);
      gl.uniform1i(uniforms.advection.uVelocity, 0);
      bindTexture(sourceTexture, 1);
      gl.uniform1i(uniforms.advection.uSource, 1);

      blit(target.write);
      target.swap();
    };

    const step = (dt, timeSeconds) => {
      if (!velocity || !dye || !pressure || !divergence || !curl || !velocitySource) {
        return;
      }

      processSplats();

      advect(velocity, velocity.read.texture, velocity.read.texture, dt, config.velocityDissipation);

      gl.useProgram(programs.curl);
      gl.uniform2f(uniforms.curl.uTexelSize, 1 / simWidth, 1 / simHeight);
      bindTexture(velocity.read.texture, 0);
      gl.uniform1i(uniforms.curl.uVelocity, 0);
      blit(curl);

      gl.useProgram(programs.vorticity);
      gl.uniform2f(uniforms.vorticity.uTexelSize, 1 / simWidth, 1 / simHeight);
      gl.uniform1f(uniforms.vorticity.uCurlStrength, config.curlStrength);
      gl.uniform1f(uniforms.vorticity.uDt, dt);
      bindTexture(velocity.read.texture, 0);
      gl.uniform1i(uniforms.vorticity.uVelocity, 0);
      bindTexture(curl.texture, 1);
      gl.uniform1i(uniforms.vorticity.uCurl, 1);
      blit(velocity.write);
      velocity.swap();

      drawTexture(programs.copy, velocity.read.texture, velocitySource);

      const diffusionAlpha = config.viscosity * dt * 60;
      const diffusionBeta = 1 + 4 * diffusionAlpha;

      gl.useProgram(programs.diffusion);
      gl.uniform2f(uniforms.diffusion.uTexelSize, 1 / simWidth, 1 / simHeight);
      gl.uniform1f(uniforms.diffusion.uAlpha, diffusionAlpha);
      gl.uniform1f(uniforms.diffusion.uBeta, diffusionBeta);
      bindTexture(velocitySource.texture, 1);
      gl.uniform1i(uniforms.diffusion.uSource, 1);

      for (let iteration = 0; iteration < config.viscosityIterations; iteration += 1) {
        bindTexture(velocity.read.texture, 0);
        gl.uniform1i(uniforms.diffusion.uVelocity, 0);
        blit(velocity.write);
        velocity.swap();
      }

      gl.useProgram(programs.divergence);
      gl.uniform2f(uniforms.divergence.uTexelSize, 1 / simWidth, 1 / simHeight);
      bindTexture(velocity.read.texture, 0);
      gl.uniform1i(uniforms.divergence.uVelocity, 0);
      blit(divergence);

      gl.useProgram(programs.clear);
      bindTexture(pressure.read.texture, 0);
      gl.uniform1i(uniforms.clear.uTexture, 0);
      gl.uniform1f(uniforms.clear.uValue, 0.84);
      blit(pressure.write);
      pressure.swap();

      gl.useProgram(programs.pressure);
      gl.uniform2f(uniforms.pressure.uTexelSize, 1 / simWidth, 1 / simHeight);
      bindTexture(divergence.texture, 1);
      gl.uniform1i(uniforms.pressure.uDivergence, 1);

      for (let iteration = 0; iteration < config.pressureIterations; iteration += 1) {
        bindTexture(pressure.read.texture, 0);
        gl.uniform1i(uniforms.pressure.uPressure, 0);
        blit(pressure.write);
        pressure.swap();
      }

      gl.useProgram(programs.gradientSubtract);
      gl.uniform2f(uniforms.gradientSubtract.uTexelSize, 1 / simWidth, 1 / simHeight);
      bindTexture(pressure.read.texture, 0);
      gl.uniform1i(uniforms.gradientSubtract.uPressure, 0);
      bindTexture(velocity.read.texture, 1);
      gl.uniform1i(uniforms.gradientSubtract.uVelocity, 1);
      blit(velocity.write);
      velocity.swap();

      advect(dye, velocity.read.texture, dye.read.texture, dt, config.densityDissipation);

      gl.useProgram(programs.display);
      gl.uniform2f(uniforms.display.uTexelSize, 1 / dyeWidth, 1 / dyeHeight);
      gl.uniform2f(uniforms.display.uResolution, displayWidth, displayHeight);
      gl.uniform3f(
        uniforms.display.uBaseColor,
        paletteValues.deep[0],
        paletteValues.deep[1],
        paletteValues.deep[2],
      );
      gl.uniform3f(
        uniforms.display.uDeepColor,
        paletteValues.base[0],
        paletteValues.base[1],
        paletteValues.base[2],
      );
      gl.uniform3f(
        uniforms.display.uGlowColor,
        auraColor[0],
        auraColor[1],
        auraColor[2],
      );
      gl.uniform3f(
        uniforms.display.uHighlightColor,
        highlightColor[0],
        highlightColor[1],
        highlightColor[2],
      );
      gl.uniform1f(uniforms.display.uTime, timeSeconds);
      bindTexture(dye.read.texture, 0);
      gl.uniform1i(uniforms.display.uDensity, 0);
      bindTexture(velocity.read.texture, 1);
      gl.uniform1i(uniforms.display.uVelocity, 1);
      blit(null);
    };

    const updatePointer = (event) => {
      const rect = container.getBoundingClientRect();
      const insideX = event.clientX >= rect.left && event.clientX <= rect.right;
      const insideY = event.clientY >= rect.top && event.clientY <= rect.bottom;

      if (!insideX || !insideY) {
        return;
      }

      const x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      const y = clamp(1 - (event.clientY - rect.top) / rect.height, 0, 1);

      if (!pointer.initialized) {
        pointer.x = x;
        pointer.y = y;
        pointer.initialized = true;
      } else {
        emitTrail(pointer.x, pointer.y, x, y, pointer.down ? 1.18 : 1);
        pointer.x = x;
        pointer.y = y;
      }

      pointer.active = true;
      pointer.lastMove = performance.now();
    };

    const handlePointerMove = (event) => {
      updatePointer(event);
    };

    const handlePointerDown = (event) => {
      pointer.down = true;
      updatePointer(event);

      enqueueSplat({
        x: pointer.x,
        y: pointer.y,
        dx: 0,
        dy: 0,
        color: sampleColor(performance.now() * 0.00016 + 0.4, 0.8),
        radius: getRadius(0.95, true),
      });
    };

    const handlePointerUp = () => {
      pointer.down = false;
    };

    const render = (frameTime) => {
      if (disposed) {
        return;
      }

      const dt = Math.min((frameTime - lastFrameTime) / 1000, 0.02);
      lastFrameTime = frameTime;
      const timeSeconds = frameTime * 0.001;

      addAutoMotion(timeSeconds);
      step(dt, timeSeconds);
      animationFrameId = window.requestAnimationFrame(render);
    };

    gl.disable(gl.BLEND);
    resizeCanvas();

    resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(container);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("pointercancel", handlePointerUp, { passive: true });

    animationFrameId = window.requestAnimationFrame(render);

    return () => {
      disposed = true;

      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      resizeObserver?.disconnect();

      destroyFramebuffers();

      Object.values(programs).forEach((program) => gl.deleteProgram(program));
      gl.deleteBuffer(quadBuffer);
      gl.deleteVertexArray(quadVao);
    };
  }, [palette.base, palette.deep, palette.primary, palette.secondary, palette.surface]);

  return (
    <div ref={containerRef} className={`pointer-events-none absolute inset-0 ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 16% 18%, rgba(0, 173, 181, 0.2), transparent 34%),
            radial-gradient(circle at 82% 22%, rgba(0, 124, 255, 0.22), transparent 30%),
            radial-gradient(circle at 50% 78%, rgba(22, 33, 62, 0.28), transparent 42%),
            linear-gradient(180deg, rgba(3, 7, 16, 0.96) 0%, rgba(4, 10, 20, 0.9) 44%, rgba(2, 5, 12, 0.98) 100%)
          `,
        }}
      />
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
          isSupported ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at center, rgba(5, 8, 22, 0.08) 0%, rgba(5, 8, 22, 0.38) 58%, rgba(2, 4, 10, 0.92) 100%),
            linear-gradient(180deg, rgba(2, 4, 10, 0.78) 0%, rgba(2, 4, 10, 0.08) 26%, rgba(2, 4, 10, 0.14) 74%, rgba(2, 4, 10, 0.82) 100%)
          `,
        }}
      />
    </div>
  );
};

export default LiquidEtherBackground;
