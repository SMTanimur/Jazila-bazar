'use client';

import { motion, Variants } from 'framer-motion';

const letter: Variants = {
  initial: {
    opacity: 0,
    y: 15,
  },
  animate: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      ease: 'easeInOut',
      delay: 0.07 * custom,
    },
  }),
};

export default function AnimatedCharacters({ text }: { text: string }) {
  return (
    <>
      <span className='sr-only'>{text}</span>
      <span aria-hidden='true'>
        {Array.from(text).map((char, index) => {
          return (
            <motion.span
              key={index}
              variants={letter}
              initial='initial'
              animate='animate'
              custom={index}
              className='inline-block'
            >
              {char}
            </motion.span>
          );
        })}
      </span>
    </>
  );
}
