'use client';

import React from 'react';
import { motion, MotionConfig } from 'motion/react';

const EASE_CURVE = [0.16, 1, 0.3, 1] as const;

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

interface RevealBlockProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function RevealBlock({
  children,
  className = '',
  delay = 0,
  y = 18,
}: RevealBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.55, delay, ease: EASE_CURVE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface RevealStaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function RevealStagger({
  children,
  className = '',
  staggerDelay = 0.06,
}: RevealStaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.06 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 18 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.52,
            ease: EASE_CURVE,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
