import Statistics from '@/components/Statistics/Statistics';
import {
  OurServicesProvider,
  OurServicesImage,
  OurServicesFaqs,
} from '@/components/Motionanimations/Motionanimations';
import React from 'react';
import Image from 'next/image';
import owner1 from '../../../public/owners/owner.webp';
import owner2 from '../../../public/owners/owner2.webp';

const owners = [
  { id: 1, img: owner1, name: 'Owner One' },
  { id: 2, img: owner2, name: 'Owner Two' },
];

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

const page = () => {
  return (
    <div className="common-box">
      <div className="container">
        <div className="about-us-section grid grid-cols-4 gap-6">
          <div className="founded-container col-span-4 md:col-span-1">
            <ul className="flex items-center [&>li:not(:first-child)]:-ml-3">
              {owners.map(owner => (
                <li
                  key={owner.id}
                  className="relative h-[60px] w-[60px] md:h-[90px] md:w-[90px]">
                  <Image
                    src={owner.img}
                    alt={owner.name}
                    fill
                    className="rounded-full object-cover outline-2 outline-white"
                  />
                </li>
              ))}
            </ul>

            <div className="founded-title [&>span]:block leading-[1.3] text-xl md:text-2xl uppercase [&>span:last-child]:font-bold mt-8">
              <span>Founders of</span>
              <span>Flamingo It Studio</span>
            </div>
          </div>

          <div className="col-span-4 md:col-span-3">
            <div className="page-title">
              <h1>Crafting Interfaces, Component by Component</h1>
              <article className="text-xl [&>p]:mt-7 [&>p:first-child]:mt-0 mt-8 md:mt-12  lg:mt-16">
                <p>
                  Welcome to Flamingo IT Studio, where cutting-edge technology
                  meets visionary creativity. As a dynamic web development firm,
                  our mission is simple yet impactful: to build powerful,
                  seamless, and future-ready digital solutions that captivate
                  users and elevate brands.
                </p>
                <p>
                  We proudly partner with clients across the globe—offering
                  advanced web development services in Thamel, Nepal and
                  custom-built digital platforms for businesses in Kolkata and
                  beyond.
                </p>
                <p>
                  Driven by innovation and grounded in functionality, every
                  project we take on is an opportunity to redefine
                  possibilities. From sleek websites to complex web
                  applications, we combine clean code, intuitive interfaces, and
                  scalable architecture to bring your digital vision to life.
                </p>
                <p>
                  Join us on a journey where performance meets precision, where
                  every line of code tells a story, and where your business
                  goals fuel our development process. Welcome to Flamingo IT
                  Studio—where we don’t just develop websites; we engineer
                  digital experiences that move your brand forward.
                </p>
              </article>
            </div>
          </div>
        </div>

        <div className="our-principles">
          <div className="page-title max-w-[895.59px]">
            <h2>Explore Our Services</h2>
          </div>
          <OurServicesProvider
            images={images}
            faqs={faqs}>
            <div className="our-service-container grid gap-10 md:grid-cols-2 items-start">
              <div className="image-section flex flex-col items-center justify-center">
                <span className="block text-xl md:text-2xl lg:text-[35px] leading-[1.4]  md:mb-6">
                  We build with purpose, led by principles that value integrity,
                  innovation, and delivering digital experiences that truly
                  matter.
                </span>
                <OurServicesImage />
              </div>
              <div className="faqs-section">
                <OurServicesFaqs />
              </div>
            </div>
          </OurServicesProvider>
        </div>

        <Statistics />
      </div>
    </div>
  );
};

export default page;
