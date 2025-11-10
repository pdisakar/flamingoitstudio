'use client';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ProjectAnalysisDesktopImage,
  ProjectAnalysisMobileImage,
} from '../Motionanimations/Motionanimations';

import case1 from '../../../public/Projectanalysis/case1.png';
import case2 from '../../../public/Projectanalysis/case2.png';
import case3 from '../../../public/Projectanalysis/case3.png';

const casees = [
  {
    id: 1,
    image: case1,
    title: 'Nepal’s Top Travel Agency Website Development and Maintenance',
    dody: 'Developed a dynamic website for Nepal’s leading company, seamlessly blending powerful functionality with a modern design to elevate brand presence and deliver an engaging, user-centric digital experience.',
    link: 'nepal-hiking-team',
  },
  {
    id: 2,
    image: case2,
    title:
      'Crafted and Maintain the Digital Platform for Nepal’s Leading Travel Agency',
    dody: 'Designed and maintained the website for Nepal’s top-ranked travel agency in recent years, delivering a seamless user experience, robust performance, and a compelling digital presence that reflects their industry-leading status.',
    link: 'luxury-holidays',
  },
  {
    id: 3,
    image: case3,
    title:
      'Website Development and Maintenance for Nepal’s Emerging Travel Agency',
    dody: 'Designed and developed the website for one of Nepal’s fastest-growing travel agencies, creating a modern, scalable platform to support their rising presence in the tourism industry.',
    link: 'everest-luxury',
  },
];

const Projectanalysis = () => {
  const [activeImage, setActiveImage] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveImage(index);
          }
        });
      },
      { threshold: 1 }
    );

    sectionRefs.current.forEach(ref => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="common-box pt-0 relative">
      <div className="container">
        <div className="home-title text-center mb-14">
          <h2>In Depth Analysis of Our Best Works</h2>
          <span>
            Discover our case studies showcasing exceptional web development
            projects and impactful digital solutions.
          </span>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-2 md:gap-6 lg:gap-12 min-h-screen mt-20">
          <div className="sticky top-20 h-[550px] lg:h-[800px] flex items-start">
            <ProjectAnalysisDesktopImage
              key={activeImage}
              image={casees[activeImage].image}
              alt={casees[activeImage].title}
              keyValue={activeImage}
              className="w-full h-full overflow-hidden rounded-lg"
            />
          </div>

          <div>
            {casees.map((item, i) => (
              <div
                key={item.id}
                data-index={i}
                ref={el => {
                  sectionRefs.current[i] = el;
                }}
                className="md:pt-10 lg:pt-40">
                <h3 className="text-3xl lg:text-[48px] font-semibold leading-[1.2]">
                  {item.title}
                </h3>

                <p className="my-5 text-lg opacity-80 leading-relaxed">
                  {item.dody}
                </p>

                <Link
                  href={item.link}
                  className="group flex items-center gap-3 border border-primary text-primary hover:bg-primary hover:text-white transition rounded-full pl-6 pr-2 py-2 text-base w-fit">
                  Read Now
                  <div className="action-btn h-10 w-10 bg-primary/20 flex items-center group-hover:bg-white/20 justify-center rounded-full">
                    <svg
                      width={16}
                      height={16}
                      className="transition duration-300 group-hover:-rotate-45"
                      fill="currentColor">
                      <use xlinkHref="/icons.svg#arrow45" />
                    </svg>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden space-y-20 mt-10">
          {casees.map(item => (
            <div key={item.id}>
              <ProjectAnalysisMobileImage
                image={item.image}
                alt={item.title}
                className="overflow-hidden"
              />

              <h3 className="text-3xl font-semibold leading-tight">
                {item.title}
              </h3>

              <p className="my-3 text-base opacity-80">{item.dody}</p>

              <Link
                href={item.link}
                className="group flex items-center gap-3 border border-primary text-primary hover:bg-primary hover:text-white transition rounded-full pl-6 pr-2 py-2 text-base w-fit">
                Read Now
                <div className="action-btn h-10 w-10 bg-primary/20 flex items-center group-hover:bg-white/20 justify-center rounded-full">
                  <svg
                    width={16}
                    height={16}
                    className="transition duration-300 group-hover:-rotate-45"
                    fill="currentColor">
                    <use xlinkHref="/icons.svg#arrow45" />
                  </svg>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projectanalysis;
