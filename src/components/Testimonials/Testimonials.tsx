'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';

import client1 from '../../../public/clients/client1.svg';
import client2 from '../../../public/clients/client2.svg';
import client3 from '../../../public/clients/client3.png';

const items = [
  {
    id: 1,
    author: 'Kakashi1',
    position: 'Founder',
    body: 'They gave a clear overview of the design and approval milestones and executed them accordingly. Communication and the work delivered were both top-notch. I’d highly recommend working with her!',
    img: client1.src,
  },
  {
    id: 2,
    author: 'Naruto2',
    position: 'CEO',
    body: 'They gave a clear overview of the design and approval milestones and executed them accordingly. Communication and the work delivered were both top-notch. I’d highly recommend working with her!',
    img: client2.src,
  },
  {
    id: 3,
    author: 'Sasuke3',
    position: 'CTO',
    body: 'They gave a clear overview of the design and approval milestones and executed them accordingly. Communication and the work delivered were both top-notch. I’d highly recommend working with her!',
    img: client3.src,
  },
  {
    id: 4,
    author: 'Sakura4',
    position: 'Designer',
    body: 'They gave a clear overview of the design and approval milestones and executed them accordingly. Communication and the work delivered were both top-notch. I’d highly recommend working with her!',
    img: client1.src,
  },
  {
    id: 5,
    author: 'Hinata5',
    position: 'Marketing',
    body: 'They gave a clear overview of the design and approval milestones and executed them accordingly. Communication and the work delivered were both top-notch. I’d highly recommend working with her!',
    img: client2.src,
  },
  {
    id: 6,
    author: 'Rock Lee6',
    position: 'Engineer',
    body: 'They gave a clear overview of the design and approval milestones and executed them accordingly. Communication and the work delivered were both top-notch. I’d highly recommend working with her!',
    img: client3.src,
  },
];

const loopItems = [...items, ...items, ...items];

const Testimonials = () => {
  const [itemsPerView, setItemsPerView] = useState(1);
  const [slideWidth, setSlideWidth] = useState(0);
  const [index, setIndex] = useState(items.length);
  const controls = useAnimation();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const isTransitioning = useRef(false);

  const updateItemsPerView = () => {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  useEffect(() => {
    const handleResize = () => {
      const newCount = updateItemsPerView();
      setItemsPerView(newCount);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ensure slide width recalculates AFTER resizing
  useEffect(() => {
    if (!trackRef.current) return;
    const container = trackRef.current.parentElement;
    if (!container) return;

    const width = container.offsetWidth / itemsPerView;
    setSlideWidth(width);

    // Re-center to prevent misalignment
    const middle = items.length;
    setIndex(middle);
    controls.set({ x: -(middle * width) });
  }, [itemsPerView]);

  const slideTo = async (newIndex: number) => {
    if (isTransitioning.current || slideWidth === 0) return;
    isTransitioning.current = true;

    await controls.start({
      x: -newIndex * slideWidth,
      transition: { duration: 0.45, ease: 'easeInOut' },
    });

    if (newIndex >= items.length * 2) {
      newIndex = items.length;
      controls.set({ x: -newIndex * slideWidth });
    }
    if (newIndex < items.length) {
      newIndex = items.length * 2 - 1;
      controls.set({ x: -newIndex * slideWidth });
    }

    setIndex(newIndex);
    isTransitioning.current = false;
  };

  return (
    <section className="common-box pt-0">
      <div className="container mx-auto px-4">
        <div className="home-title max-w-[895.59px]">
          <h2>Partners in Success</h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              ref={trackRef}
              className="flex"
              animate={controls}>
              {loopItems.map((item, i) => (
                <div
                  key={`${item.id}-${i}`}
                  style={{ width: `${slideWidth}px` }}
                  className="shrink-0">
                  <div className="bg-white/5 border-body-bg border p-6 lg:p-10 rounded-xl">
                    <div className="relative w-full h-[70px] mb-6">
                      <Image
                        src={item.img}
                        alt={item.author}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <p className="text-[20px] lg:text-[28px]">"{item.body}"</p>

                    <div className="mt-6">
                      <h4 className="text-lg lg:text-xl">{item.author}</h4>
                      <span className="text-sm opacity-70">
                        {item.position}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Buttons */}
          <button
            onClick={() => slideTo(index - 1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm border border-white/20 transition-all">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={() => slideTo(index + 1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm border border-white/20 transition-all">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => slideTo(items.length + i)}
              className={`w-2 h-2 rounded-full transition-all ${
                index % items.length === i
                  ? 'bg-white w-8'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
