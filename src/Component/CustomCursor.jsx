
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);


  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 120 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
   
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isLargeScreen) return;

    const moveCursor = (e) => {
      mouseX.set(e.clientX - 15); 
      mouseY.set(e.clientY - 15);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [isLargeScreen, mouseX, mouseY]);

  if (!isLargeScreen) return null;

  return (
    <motion.div
      style={{
        translateX: cursorX,
        translateY: cursorY,
      }}
      className="pointer-events-none fixed top-0 left-0 z-50 w-8 h-8 rounded-full bg-[#00ADB5] border-2 border-[#007CFF] mix-blend-difference"
    />
  );
};

export default CustomCursor;
