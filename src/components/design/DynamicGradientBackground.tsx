
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const DynamicGradientBackground = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.25, 0.15]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* Warm cream glow - Top Right */}
      <motion.div
        style={{ top: '-20%', right: '-10%', y: y1, opacity }}
        className="absolute w-[80vw] h-[80vw] rounded-full blur-[120px] bg-gradient-to-b from-[#e9e9d9]/40 to-transparent pointer-events-none"
      />

      {/* Warm stone glow - Bottom Left */}
      <motion.div
        style={{ bottom: '-20%', left: '-10%', y: y2, opacity }}
        className="absolute w-[80vw] h-[80vw] rounded-full blur-[120px] bg-gradient-to-t from-[#e3e4d3]/30 to-transparent pointer-events-none"
      />

      {/* Subtle Center Ambient */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(27,29,18,0.01)_0%,transparent_70%)] pointer-events-none"
      />
    </div>
  );
};

export default DynamicGradientBackground;
