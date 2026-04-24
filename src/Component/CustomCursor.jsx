import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isLargeScreen) {
      document.body.style.cursor = 'auto';
      return;
    }

    // Hide default cursor on large screens
    document.body.style.cursor = 'none';

    const moveCursor = (e) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };

    const handleMouseEnter = (e) => {
      const target = e.target;

      if (!(target instanceof Element)) {
        return;
      }

      const tagName = target.tagName;
      const isInteractiveTag = tagName === 'A' || tagName === 'BUTTON';
      const hasPointerClass = target.classList?.contains('cursor-pointer');
      const hasPointerCursor = window.getComputedStyle(target).cursor === 'pointer';

      if (isInteractiveTag || typeof target.onclick === 'function' || hasPointerClass || hasPointerCursor) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, [isLargeScreen, mouseX, mouseY]);

  if (!isLargeScreen) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-8 h-8 rounded-full"
      >
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00ADB5] to-[#007CFF] opacity-30 blur-md"></div>
        
        {/* Main cursor circle */}
        <div className="absolute inset-0 rounded-full border-2 border-[#00ADB5] bg-[#00ADB5]/20 backdrop-blur-sm"></div>
        
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00ADB5]"></div>
      </motion.div>

      {/* Trailing cursor ring */}
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY,
        }}
        animate={{
          scale: isHovering ? 2 : 1.5,
          opacity: isHovering ? 0.4 : 0.2,
        }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none fixed top-0 left-0 z-[9998] w-8 h-8 rounded-full border border-[#007CFF]"
      ></motion.div>

      <style>{`
        * {
          cursor: none !important;
        }
        
        a, button, [role="button"], input[type="submit"], input[type="button"] {
          cursor: none !important;
        }

        /* Ensure cursor is hidden in all states */
        html, body, #root {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;