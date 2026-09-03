import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import heroChipBg from '../../assets/hero-chip-bg.jpg';
import { useTheme } from '../../context/ThemeContext';

interface ScrollMotionBackgroundProps {
  className?: string;
  enableInteractiveGlow?: boolean;
}

export const ScrollMotionBackground: React.FC<ScrollMotionBackgroundProps> = ({
  className = '',
  enableInteractiveGlow = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { isDark } = useTheme();

  // Track global window scroll position
  const { scrollYProgress } = useScroll();

  // Spring physics for buttery-smooth scroll responsiveness
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 28,
    stiffness: 90,
    restDelta: 0.001
  });

  // Dynamic parallax transformations synced with page scroll
  const y = useTransform(
    smoothProgress, 
    [0, 1], 
    shouldReduceMotion ? ['0%', '0%'] : ['0%', '-14%']
  );

  const scale = useTransform(
    smoothProgress, 
    [0, 0.5, 1], 
    shouldReduceMotion ? [1, 1, 1] : [1.03, 1.09, 1.16]
  );

  const rotate = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    shouldReduceMotion ? [0, 0, 0] : [0, -0.4, 0.3]
  );

  const glowPulse = useTransform(
    smoothProgress,
    [0, 0.3, 0.6, 1],
    [0.7, 1.0, 0.8, 0.95]
  );

  return (
    <div 
      ref={containerRef}
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-colors duration-500 ${
        isDark ? 'bg-[#07090e]' : 'bg-[#e2e8f0]'
      } ${className}`}
    >
      {/* Motion Background Image Layer */}
      <motion.div
        style={{
          y,
          scale,
          rotate,
          transformOrigin: '50% 35%',
        }}
        className="absolute inset-0 -top-16 -bottom-16 -left-8 -right-8 will-change-transform"
      >
        {/* Directly visible full-fidelity image */}
        <img
          src={heroChipBg || '/hero-chip-bg.jpg'}
          alt="Hardware Microchip Background"
          className="w-full h-full object-cover object-center sm:object-[center_25%] transition-all duration-500"
          style={{
            filter: isDark 
              ? 'brightness(0.96) contrast(1.05)' 
              : 'brightness(0.98) contrast(1.02) saturate(0.95)',
          }}
          loading="eager"
        />

        {/* High-tech cyber vignette in night mode / Day-mode luminous ambient wash */}
        <div 
          className={`absolute inset-0 transition-all duration-500 pointer-events-none ${
            isDark 
              ? 'bg-radial from-transparent via-black/20 to-black/60' 
              : 'bg-gradient-to-b from-slate-100/75 via-slate-200/65 to-slate-100/80 backdrop-blur-[1px]'
          }`} 
        />

        {/* Dynamic Glowing Circuit Points synced with scroll motion */}
        {enableInteractiveGlow && !shouldReduceMotion && (
          <>
            {/* Cyan Neon Glow Node (matches the microchip pins) */}
            <motion.div
              style={{
                opacity: glowPulse,
                boxShadow: isDark 
                  ? '0 0 100px 50px rgba(56, 189, 248, 0.4)' 
                  : '0 0 80px 40px rgba(56, 189, 248, 0.25)',
              }}
              className="absolute top-[30%] left-[46%] w-36 h-36 rounded-full bg-cyan-400/25 blur-2xl pointer-events-none"
            />

            {/* Amber Glowing LED Node (matches the orange diode in bottom-left) */}
            <motion.div
              style={{
                opacity: glowPulse,
                boxShadow: isDark 
                  ? '0 0 90px 45px rgba(245, 158, 11, 0.45)' 
                  : '0 0 70px 35px rgba(245, 158, 11, 0.25)',
              }}
              className="absolute bottom-[28%] left-[18%] w-28 h-28 rounded-full bg-amber-500/30 blur-2xl pointer-events-none"
            />
          </>
        )}
      </motion.div>
    </div>
  );
};

