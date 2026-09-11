import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion, useMotionValue } from 'framer-motion';
import heroSpheresBackdrop from '../../assets/hero-spheres-backdrop.png';
import ballCenterImg from '../../assets/ball-center.png';
import ballLeftImg from '../../assets/ball-left.png';
import ballTopImg from '../../assets/ball-top.png';
import ballRightImg from '../../assets/ball-right.png';
import { useTheme } from '../../context/ThemeContext';

interface ScrollMotionBackgroundProps {
  className?: string;
  enableInteractiveGlow?: boolean;
}

export const ScrollMotionBackground: React.FC<ScrollMotionBackgroundProps> = ({
  className = '',
  enableInteractiveGlow = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { isDark } = useTheme();

  // Subtle interactive mouse tracking using MotionValues (Zero React re-renders)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize coordinates around screen center (-1 to 1)
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(nx);
      mouseY.set(ny);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [shouldReduceMotion, mouseX, mouseY]);

  const smoothMouseX = useSpring(mouseX, { damping: 25, stiffness: 60 });
  const smoothMouseY = useSpring(mouseY, { damping: 25, stiffness: 60 });

  // Track global window scroll position
  const { scrollYProgress } = useScroll();

  // Spring physics for buttery-smooth responsiveness
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 32,
    stiffness: 85,
    mass: 0.75,
    restDelta: 0.0005,
  });

  // Base backdrop parallax
  const bgY = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? ['0%', '0%'] : ['0%', '-8%']
  );
  const bgScale = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    shouldReduceMotion ? [1, 1, 1] : [1.02, 1.06, 1.1]
  );

  // 1. Center Main Sphere (Closest Foreground - heavy parallax & dynamic spin)
  const centerBallY = useTransform(smoothProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 240]);
  const centerBallX = useTransform(smoothProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -50]);
  const centerBallRotate = useTransform(smoothProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 65]);
  const centerBallScale = useTransform(smoothProgress, [0, 0.5, 1], shouldReduceMotion ? [1, 1, 1] : [1, 1.12, 0.94]);

  // 2. Left Sphere (Cool Blue Spotlight - lateral drift & counter spin)
  const leftBallY = useTransform(smoothProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 160]);
  const leftBallX = useTransform(smoothProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -75]);
  const leftBallRotate = useTransform(smoothProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -80]);
  const leftBallScale = useTransform(smoothProgress, [0, 0.5, 1], shouldReduceMotion ? [1, 1, 1] : [1, 1.08, 0.95]);

  // 3. Right Sphere (Amber/Gold Rim Light - high arc & clockwise roll)
  const rightBallY = useTransform(smoothProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 280]);
  const rightBallX = useTransform(smoothProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 85]);
  const rightBallRotate = useTransform(smoothProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 95]);
  const rightBallScale = useTransform(smoothProgress, [0, 0.5, 1], shouldReduceMotion ? [1, 1, 1] : [1, 1.16, 1.02]);

  // 4. Top Sphere (Background Depth - slow gentle float)
  const topBallY = useTransform(smoothProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 95]);
  const topBallX = useTransform(smoothProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 35]);
  const topBallRotate = useTransform(smoothProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -45]);
  const topBallScale = useTransform(smoothProgress, [0, 0.5, 1], shouldReduceMotion ? [1, 1, 1] : [1, 0.96, 1.04]);

  const topBallMouseX = useTransform(smoothMouseX, v => shouldReduceMotion ? 0 : v * -8);
  const topBallMouseY = useTransform(smoothMouseY, v => shouldReduceMotion ? 0 : v * -8);
  
  const leftBallMouseX = useTransform(smoothMouseX, v => shouldReduceMotion ? 0 : v * -14);
  const leftBallMouseY = useTransform(smoothMouseY, v => shouldReduceMotion ? 0 : v * -14);
  
  const centerBallMouseX = useTransform(smoothMouseX, v => shouldReduceMotion ? 0 : v * -20);
  const centerBallMouseY = useTransform(smoothMouseY, v => shouldReduceMotion ? 0 : v * -20);
  
  const rightBallMouseX = useTransform(smoothMouseX, v => shouldReduceMotion ? 0 : v * -16);
  const rightBallMouseY = useTransform(smoothMouseY, v => shouldReduceMotion ? 0 : v * -16);

  // Dynamic ambient glow pulse synchronized with scroll depth
  const cyanGlowPulse = useTransform(smoothProgress, [0, 0.35, 0.7, 1], [0.65, 0.95, 0.75, 1.0]);
  const amberGlowPulse = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [0.6, 1.0, 0.7, 0.9]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-colors duration-700 ${
        isDark ? 'bg-[#030407]' : 'bg-[#e2e8f0]'
      } ${className}`}
    >
      {/* Dynamic Base Parallax Environment Layer */}
      <motion.div
        style={{
          y: bgY,
          scale: bgScale,
          transformOrigin: '50% 40%',
        }}
        className="absolute inset-0 -top-12 -bottom-12 -left-6 -right-6 will-change-transform"
      >
        <img
          src={heroSpheresBackdrop || '/hero-spheres-backdrop.png'}
          alt="Atmospheric Studio Background"
          className="w-full h-full object-cover object-center sm:object-[center_35%] transition-all duration-700"
          style={{
            filter: isDark
              ? 'brightness(0.98) contrast(1.08)'
              : 'brightness(0.95) contrast(1.02) saturate(0.92)',
          }}
          loading="eager"
        />

        {/* Ambient lighting overlays for theme harmony */}
        <div
          className={`absolute inset-0 transition-all duration-700 pointer-events-none ${
            isDark
              ? 'bg-radial from-transparent via-black/15 to-black/65'
              : 'bg-gradient-to-b from-slate-100/70 via-slate-200/60 to-slate-100/75 backdrop-blur-[1px]'
          }`}
        />

        {/* Dynamic Neon Cyan Glow Node (under blue spotlight) */}
        {enableInteractiveGlow && !shouldReduceMotion && (
          <motion.div
            style={{
              opacity: cyanGlowPulse,
              boxShadow: isDark
                ? '0 0 140px 70px rgba(56, 189, 248, 0.45)'
                : '0 0 90px 45px rgba(56, 189, 248, 0.25)',
            }}
            className="absolute top-[42%] left-[22%] w-48 h-48 rounded-full bg-cyan-500/25 blur-3xl pointer-events-none"
          />
        )}

        {/* Dynamic Amber Glow Node (under right rim illumination) */}
        {enableInteractiveGlow && !shouldReduceMotion && (
          <motion.div
            style={{
              opacity: amberGlowPulse,
              boxShadow: isDark
                ? '0 0 130px 65px rgba(245, 158, 11, 0.4)'
                : '0 0 85px 40px rgba(245, 158, 11, 0.2)',
            }}
            className="absolute top-[32%] right-[18%] w-44 h-44 rounded-full bg-amber-500/25 blur-3xl pointer-events-none"
          />
        )}
      </motion.div>

      {/* 
        ═══════════════════════════════════════════════════════════
        FLOATING FRAMER MOTION SPHERES STAGE
        ═══════════════════════════════════════════════════════════
      */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-full max-w-[1440px] h-full">

          {/* 1. TOP SPHERE (Background Depth, Floating High) */}
          <motion.div
            style={{
              y: topBallY,
              x: topBallX,
              rotate: topBallRotate,
              scale: topBallScale,
            }}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, -10, 0],
                    x: [0, 6, 0],
                    rotate: [0, 4, 0],
                  }
            }
            transition={{
              repeat: Infinity,
              duration: 7,
              ease: 'easeInOut',
            }}
            className="absolute top-[14%] sm:top-[16%] left-[54%] sm:left-[56%] w-16 sm:w-24 lg:w-28 will-change-transform drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
          >
            <motion.div
              style={{
                x: topBallMouseX,
                y: topBallMouseY,
              }}
            >
              <img
                src={ballTopImg || '/ball-top.png'}
                alt="Orbital Metal Sphere Top"
                className="w-full h-auto object-contain select-none"
                draggable={false}
              />
            </motion.div>
          </motion.div>

          {/* 2. LEFT SPHERE (Cyan Spotlight Reflector) */}
          <motion.div
            style={{
              y: leftBallY,
              x: leftBallX,
              rotate: leftBallRotate,
              scale: leftBallScale,
            }}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, 14, 0],
                    x: [0, -8, 0],
                    rotate: [0, -6, 0],
                  }
            }
            transition={{
              repeat: Infinity,
              duration: 6.2,
              ease: 'easeInOut',
              delay: 0.5,
            }}
            className="absolute top-[32%] sm:top-[34%] left-[44%] sm:left-[47%] w-20 sm:w-28 lg:w-36 will-change-transform drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)]"
          >
            <motion.div
              style={{
                x: leftBallMouseX,
                y: leftBallMouseY,
              }}
              className="relative"
            >
              {/* Subtle Cyan Backlight Aura on Left Ball */}
              {enableInteractiveGlow && (
                <div className="absolute -inset-2 rounded-full bg-cyan-400/20 blur-xl pointer-events-none" />
              )}
              <img
                src={ballLeftImg || '/ball-left.png'}
                alt="Orbital Metal Sphere Left"
                className="relative w-full h-auto object-contain select-none"
                draggable={false}
              />
            </motion.div>
          </motion.div>

          {/* 3. CENTER MAIN SPHERE (Foreground Hero Element) */}
          <motion.div
            style={{
              y: centerBallY,
              x: centerBallX,
              rotate: centerBallRotate,
              scale: centerBallScale,
            }}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, -16, 0],
                    x: [0, 10, 0],
                    rotate: [0, 5, 0],
                  }
            }
            transition={{
              repeat: Infinity,
              duration: 5.5,
              ease: 'easeInOut',
            }}
            className="absolute top-[30%] sm:top-[31%] left-[58%] sm:left-[60%] w-28 sm:w-40 lg:w-52 will-change-transform z-10 drop-shadow-[0_28px_55px_rgba(0,0,0,0.95)]"
          >
            <motion.div
              style={{
                x: centerBallMouseX,
                y: centerBallMouseY,
              }}
              className="relative"
            >
              {/* Internal Plasma Glow Aura */}
              {enableInteractiveGlow && (
                <div className="absolute -inset-4 rounded-full bg-amber-500/20 blur-2xl pointer-events-none" />
              )}
              <img
                src={ballCenterImg || '/ball-center.png'}
                alt="Orbital Metal Sphere Center"
                className="relative w-full h-auto object-contain select-none"
                draggable={false}
              />
            </motion.div>
          </motion.div>

          {/* 4. RIGHT SPHERE (Golden Rim Light Element) */}
          <motion.div
            style={{
              y: rightBallY,
              x: rightBallX,
              rotate: rightBallRotate,
              scale: rightBallScale,
            }}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, 12, 0],
                    x: [0, 9, 0],
                    rotate: [0, 8, 0],
                  }
            }
            transition={{
              repeat: Infinity,
              duration: 6.8,
              ease: 'easeInOut',
              delay: 0.8,
            }}
            className="absolute top-[22%] sm:top-[24%] left-[72%] sm:left-[75%] w-24 sm:w-32 lg:w-44 will-change-transform drop-shadow-[0_22px_45px_rgba(0,0,0,0.85)]"
          >
            <motion.div
              style={{
                x: rightBallMouseX,
                y: rightBallMouseY,
              }}
              className="relative"
            >
              {/* Golden Rim Light Flare */}
              {enableInteractiveGlow && (
                <div className="absolute -inset-3 rounded-full bg-amber-400/20 blur-xl pointer-events-none" />
              )}
              <img
                src={ballRightImg || '/ball-right.png'}
                alt="Orbital Metal Sphere Right"
                className="relative w-full h-auto object-contain select-none"
                draggable={false}
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ScrollMotionBackground;
