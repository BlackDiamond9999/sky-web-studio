'use client';

import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

export function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} {...fadeUp}>
      {children}
    </motion.div>
  );
}

export function RevealStagger({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{}}
      whileInView={{ transition: { staggerChildren: 0.1, delayChildren: 0.05 } }}
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}
