import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const GalaxyBackground = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="galaxy-bg overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="star"
          style={{
            width: star.size,
            height: star.size,
            top: star.top,
            left: star.left,
            '--duration': `${star.duration}s`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/50 to-black pointer-events-none" />
    </div>
  );
};

export default GalaxyBackground;
