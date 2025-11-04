'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  { id: 1, title: 'branding' },
  { id: 2, title: 'companyanalysis' },
  { id: 3, title: 'searchengine' },
  { id: 4, title: 'socialmediamarketing' },
  { id: 5, title: 'webdesign' },
  { id: 6, title: 'webdev' },
];

const faqs = [
  {
    id: 1,
    question: 'Branding',
    answer:
      'Our web development service focuses on building high-performing, user-friendly websites that reflect your brand identity. We ensure responsive, fast-loading, and secure websites that deliver a seamless experience across all devices.',
  },
  {
    id: 2,
    question: 'Company Analysis',
    answer:
      'Our web development service focuses on building high-performing, user-friendly websites that reflect your brand identity. We ensure responsive, fast-loading, and secure websites that deliver a seamless experience across all devices.',
  },
  {
    id: 3,
    question: 'Search Engine',
    answer:
      'Our web development service focuses on building high-performing, user-friendly websites that reflect your brand identity. We ensure responsive, fast-loading, and secure websites that deliver a seamless experience across all devices.',
  },
  {
    id: 4,
    question: 'Social Media Marketing',
    answer:
      'Our web development service focuses on building high-performing, user-friendly websites that reflect your brand identity. We ensure responsive, fast-loading, and secure websites that deliver a seamless experience across all devices.',
  },
  {
    id: 5,
    question: 'Web Design',
    answer:
      'Our web development service focuses on building high-performing, user-friendly websites that reflect your brand identity. We ensure responsive, fast-loading, and secure websites that deliver a seamless experience across all devices.',
  },
  {
    id: 6,
    question: 'Web Development',
    answer:
      'Our web development service focuses on building high-performing, user-friendly websites that reflect your brand identity. We ensure responsive, fast-loading, and secure websites that deliver a seamless experience across all devices.',
  },
];

const Ourservices = () => {
  const [activeId, setActiveId] = useState<number>(1);

  const toggle = (id: number) => {
    setActiveId(id);
  };

  const currentImage = images.find(img => img.id === activeId) || images[0];

  return (
    <section className="common-box pt-0">
      <div className="container">
        <div className="home-title max-w-[895.59px]">
          <h2>Explore Our Services</h2>
        </div>

        <div className="our-service-container grid gap-10 md:grid-cols-2 items-start">
          <div className="image-section flex flex-col items-center justify-center">
            <span className="block text-xl md:text-2xl lg:text-[35px] leading-[1.4]  md:mb-6">
              Transform your brand with our cutting-edge web development
              solutions and seamless digital experiences.
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="w-[320px] h-[320px] md:w-[380px] md:h-[380px] hidden md:block">
                <svg
                  width="100%"
                  height="100%"
                  fill="currentColor">
                  <use xlinkHref={`/icons.svg#${currentImage.title}`} />
                </svg>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="faqs-section">
            {faqs.map(({ id, question, answer }) => (
              <div
                key={id}
                className="group cursor-pointer pb-8">
                <div
                  className="flex justify-between items-center"
                  onClick={() => toggle(id)}>
                  <span
                    className={`text-lg font-medium transition-colors text-[28px] lg:text-[56px] leading-[100%] ${
                      activeId === id ? 'text-primary' : 'text-body/90'
                    }`}>
                    {question}
                  </span>
                </div>

                <AnimatePresence>
                  {activeId === id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden">
                      <p className="mt-3 opacity-90 text-xl border-b border-white pb-4 leading-[1.6]">
                        {answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ourservices;
