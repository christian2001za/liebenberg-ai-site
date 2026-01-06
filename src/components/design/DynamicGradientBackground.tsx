
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const DynamicGradientBackground = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.8, 0.4]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0A0A0B]">
      {/* Platinum Glow - Top Right shifting down */}
      <motion.div
        style={{ top: '-20%', right: '-10%', y: y1, opacity }}
        className="absolute w-[80vw] h-[80vw] rounded-full blur-[120px] bg-gradient-to-b from-[#E5E4E2]/10 to-transparent pointer-events-none mix-blend-screen"
      />
      
      {/* Sand Glow - Bottom Left shifting up */}
      <motion.div
        style={{ bottom: '-20%', left: '-10%', y: y2, opacity }}
        className="absolute w-[80vw] h-[80vw] rounded-full blur-[120px] bg-gradient-to-t from-[#D4C5B0]/10 to-transparent pointer-events-none mix-blend-screen"
      />

      {/* Subtle Center Ambient */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none"
      />
    </div>
  );
};

export default DynamicGradientBackground;
