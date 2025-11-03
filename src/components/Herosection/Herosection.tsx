'use client';
import { motion } from 'framer-motion';

const techWeUse = [
  {
    name: 'React',
    icon: 'react',
  },
  {
    name: 'Next.js',
    icon: 'next',
  },
  {
    name: 'Laravel',
    icon: 'laravel',
  },
  {
    name: 'HTML',
    icon: 'html',
  },
];

const Herosection = () => {
  return (
    <section className="common-box">
      <div className="container">
        <div className="quick-service flex items-center gap-12">
          <span className="uppercase text-xl">
            Your Vision,
            <br /> Our Expertise
          </span>
          <div className="quick-service-body [&>p]:px-6 [&>p]:py-2.5 flex leading-[100%] text-[15px]">
            <p className="border-primary bg-primary/20 border rounded-full">
              UI/UX
            </p>
            <p className=" border border-white rounded-full bg-white/10 relative">
              <span className="h-7 w-7 bg-primary border border-white rounded-full flex items-center justify-center absolute top-1/2 -left-3.5 -translate-y-1/2 leading-[100%]">
                &
              </span>
              Development
            </p>
          </div>
        </div>
        <h1 className="hero-title">
          Distinctive <br /> Web <span className="text-primary"> Design</span>
        </h1>
        <div className="quick-tech-we-use flex items-center gap-14">
          <span className=" block max-w-[300px] text-4xl leading-[1.3] text-body/80">
            Developing the Website for Tomorrow
          </span>
          <ul className="tech-container flex items-center">
            {techWeUse.map(tech => (
              <motion.li
                key={tech.name}
                className="tech-item relative w-[70px] h-[70px] flex items-center justify-center bg-primary rounded-full border-2 border-white -ml-2.5"
                whileHover="hover"
                initial="rest"
                variants={{
                  rest: {},
                }}>
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
                  <use xlinkHref={`/icons.svg#${tech.icon}`} />
                </motion.svg>

                <motion.span
                  className="tech-name absolute whitespace-nowrap px-2 py-1 rounded-md"
                  variants={{
                    rest: { opacity: 0, y: 10, pointerEvents: 'none' },
                    hover: { opacity: 1, y: 0, pointerEvents: 'auto' },
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ top: '100%' }}>
                  {tech.name}
                </motion.span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Herosection;
