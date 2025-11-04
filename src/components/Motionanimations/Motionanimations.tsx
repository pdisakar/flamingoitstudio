'use client';
import { motion } from 'framer-motion';

// Hero section background animations
export const HeroLeftBackground = () => {
  return (
    <motion.div
      className="absolute h-[500px] w-[900px] left-0 bottom-[50px] bg-hero-bg-2 bg-no-repeat bg-contain -z-10"
      initial={{ x: '-100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: 'easeOut', duration: 1 }}
    />
  );
};

export const HeroRightBackground = () => {
  return (
    <motion.div
      className="absolute h-[400px] w-[200px] -right-5 top-0 bg-hero-bg bg-no-repeat bg-contain -z-10"
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: 'easeOut', duration: 1 }}
    />
  );
};

// Hero section tech item with hover animation
interface HeroTechItemProps {
  name: string;
  icon: string;
}

export const HeroTechItem = ({ name, icon }: HeroTechItemProps) => {
  return (
    <motion.li
      key={name}
      className="tech-item relative w-[70px] h-[70px] flex items-center justify-center bg-primary rounded-full border-2 border-white -ml-2.5"
      whileHover="hover"
      initial="rest"
      variants={{ rest: {} }}>
      <motion.svg
        width={36}
        height={36}
        fill="currentColor"
        className="tech-icon"
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.1 },
        }}
        transition={{ duration: 0.3 }}>
        <use xlinkHref={`/icons.svg#${icon}`} />
      </motion.svg>

      <motion.span
        className="tech-name absolute whitespace-nowrap px-2 py-1 rounded-md"
        variants={{
          rest: { opacity: 0, y: 10, pointerEvents: 'none' },
          hover: { opacity: 1, y: 0, pointerEvents: 'auto' },
        }}
        transition={{ duration: 0.3 }}
        style={{ top: '100%' }}>
        {name}
      </motion.span>
    </motion.li>
  );
};

