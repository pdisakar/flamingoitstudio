'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

import client1 from '../../../public/clients/client1.svg';
import client2 from '../../../public/clients/client2.svg';
import client3 from '../../../public/clients/client3.png';

const items = [
  {
    id: 1,
    author: 'Kakashi1',
    position: 'Founder',
    body: 'They gave a clear overview of the design and approval milestones and executed them accordingly. Communication and the work delivered were both top-notch. I’d highly recommend working with her!',
    img: client1,
  },
  {
    id: 2,
    author: 'Naruto2',
    position: 'CEO',
    body: 'They gave a clear overview of the design and approval milestones and executed them accordingly. Communication and the work delivered were both top-notch. I’d highly recommend working with her!',
    img: client2,
  },
  {
    id: 3,
    author: 'Sasuke3',
    position: 'CTO',
    body: 'They gave a clear overview of the design and approval milestones and executed them accordingly. Communication and the work delivered were both top-notch. I’d highly recommend working with her!',
    img: client3,
  },
  {
    id: 4,
    author: 'Sakura4',
    position: 'Designer',
    body: 'They gave a clear overview of the design and approval milestones and executed them accordingly. Communication and the work delivered were both top-notch. I’d highly recommend working with her!',
    img: client1,
  },
  {
    id: 5,
    author: 'Hinata5',
    position: 'Marketing',
    body: 'They gave a clear overview of the design and approval milestones and executed them accordingly. Communication and the work delivered were both top-notch. I’d highly recommend working with her!',
    img: client2,
  },
  {
    id: 6,
    author: 'Rock Lee6',
    position: 'Engineer',
    body: 'They gave a clear overview of the design and approval milestones and executed them accordingly. Communication and the work delivered were both top-notch. I’d highly recommend working with her!',
    img: client3,
  },
];

const Testimonials = () => {
  return (
    <section className="common-box pt-0">
      <div className="container mx-auto px-4">
        <div className="home-title max-w-[895.59px]">
          <h2>Partners in Success</h2>
        </div>
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
      </div>
    </section>
  );
};

export default Testimonials;
