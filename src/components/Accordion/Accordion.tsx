"use client";

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

interface AccordionItem {
  id: number;
  author: string;
  position: string;
  body: string;
  img: string | any;
}

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion = ({ items }: AccordionProps) => {
  return (
    <Swiper
      modules={[Autoplay]}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      breakpoints={{
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1280: { slidesPerView: 3 },
      }}
      className="mt-12">
      {items.map(item => (
        <SwiperSlide key={item.id}>
          <div className="bg-white/10 md:border-l border-white/15 p-10 lg:p-10 xl:p-20 h-full hover:cursor-grab">
            <div className="relative h-[70px] mb-6 flex items-start">
              <Image
                src={item.img}
                alt={item.author}
                fill
                className="object-contain"
              />
            </div>

            <p className="text-[20px] md:text-[22px] lg:text-[28px]">
              "{item.body}"
            </p>

            <div className="mt-6">
              <h4 className="text-lg lg:text-xl">{item.author}</h4>
              <span className="text-sm opacity-70">{item.position}</span>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Accordion;
