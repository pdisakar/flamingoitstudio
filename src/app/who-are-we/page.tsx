import Statistics from '@/components/Statistics/Statistics';
import {
  OurServicesProvider,
  OurServicesImage,
  OurServicesFaqs,
  OurProcessItem,
} from '@/components/Motionanimations/Motionanimations';
import React from 'react';
import Image from 'next/image';
import owner1 from '../../../public/owners/owner.webp';
import owner2 from '../../../public/owners/owner2.webp';
import Letstalk from '@/components/Letstalk/Letstalk';

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
    question: 'Innovation & Creativity',
    answer:
      'We believe innovation drives progress. By blending technology with creativity, we design digital solutions that stand out — transforming ideas into engaging, future-ready experiences that inspire and perform.',
  },
  {
    id: 2,
    question: 'Client Success First',
    answer:
      'Our clients are at the heart of everything we do. We take time to understand their goals, challenges, and vision, ensuring every project we deliver helps them grow, connect, and achieve lasting success.',
  },
  {
    id: 3,
    question: 'Quality & Precision',
    answer:
      'Excellence is our standard. From planning to deployment, we craft every detail with precision — writing clean, scalable code and creating interfaces that are fast, secure, and beautifully designed.',
  },
  {
    id: 4,
    question: 'Transparency & Trust',
    answer:
      'We value honesty, clarity, and accountability. By maintaining open communication and delivering on our promises, we build long-term relationships based on trust and mutual respect.',
  },
  {
    id: 5,
    question: 'Continuous Growth',
    answer:
      'The digital world never stops evolving — and neither do we. Our team is dedicated to continuous learning, exploring new technologies, and improving our skills to stay ahead of industry trends.',
  },
  {
    id: 6,
    question: 'Collaboration & Teamwork',
    answer:
      'We believe great things happen when creative minds work together. Our strength lies in our teamwork — sharing ideas, supporting each other, and turning collaboration into innovation.',
  },
];

const how_we_stand_out = [
  {
    id: 1,
    title: 'Collaborative Partnership',
    description:
      'At Flamingo IT Studio, we don’t just build websites—we build relationships. We believe that the best digital products are born from mutual trust, shared vision, and active engagement. From day one, we treat your goals as our own, involving you in key stages of the project lifecycle—from discovery and wireframing to deployment and support. Our team actively listens, asks the right questions, and adapts to your feedback with agility. Through open communication, regular updates, and transparent workflows, we ensure you always feel in control, confident, and heard. It’s not client vs. developer—it’s a collaborative team working toward one shared success.',
  },
  {
    id: 2,
    title: 'Precision by Design',
    description:
      "Every line of code we write and every interface we shape reflects a mindset of intentional creation. Much like an architect approaches a blueprint, we approach digital development with structure, clarity, and purpose. We don't chase trends for the sake of novelty; instead, we design and build with meaning—carefully considering user behavior, technical performance, and brand alignment. Every element on your platform has a reason to exist, contributing to a cohesive, intuitive, and engaging user experience. The result? Products that are as functional as they are beautiful—clean, logical, and engineered to last.",
  },
  {
    id: 3,
    title: 'Streamlined by Purpose',
    description:
      'Simplicity isn’t just a design choice—it’s a strategy. At Flamingo IT Studio, we embrace a lean, focused approach to development that cuts through clutter and delivers clean, efficient results. Our process removes complexity without sacrificing depth, ensuring your digital solution is fast, scalable, and easy to maintain. We prioritize speed, usability, and clean code, all while delivering sleek, intuitive interfaces that resonate with users. Whether it’s optimizing site performance, reducing bounce rates, or simplifying navigation—we make sure your digital product does more with less.',
  },
  {
    id: 4,
    title: 'Strategy-First Development',
    description:
      'Behind every powerful digital experience lies a strong strategic foundation. That’s why we start every project with deep research, smart planning, and business alignment. We don’t dive straight into design or development—we take the time to understand your market, users, competitors, and goals. This allows us to map out a development strategy that not only looks good but performs with purpose. From architecture to UX flows and backend systems, every decision we make is aligned with your bigger picture. At Flamingo IT Studio, strategy isn’t an afterthought—it’s the blueprint that guides the entire build.',
  },
];

const page = () => {
  return (
    <div className="common-box overflow-hidden ">
      <div className="container">
        <div className="common-box pt-0 about-us-section grid grid-cols-4 gap-6">
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
        <div className="common-box pt-0 statistics">
          <Statistics />
        </div>
        <div className="common-box pt-0 our-principles ">
          <div className="page-title max-w-[895.59px]">
            <h2>Our Guiding Principles</h2>
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
        <div className="common-box pt-0 how-we-stand-out ">
          <ul className="lg:[&>li>div>h3]:text-5xl md:[&>li>div>h3]:text-4xl [&>li>div>h3]:text-3xl [&>li>div>h3]:font-semibold [&>li>div>p]:text-xl lg:[&>li>div>p]:mt-6 md:[&>li>div>p]:mt-5 [&>li>div>p]:mt-4 lg:[&>li]:py-16 md:[&>li]:py-14 [&>li]:py-10 first:[&>li]:border-t [&>li]:border-b [&>li]:border-border/25 ">
            {how_we_stand_out.map((item, index) => (
              <OurProcessItem
                key={item.id}
                index={index}>
                <div className="relative z-10">
                  <h3 className="transition-colors group-hover:text-body-bg">
                    {item.title}
                  </h3>
                  <p className="group-hover:text-body-bg">{item.description}</p>
                </div>
              </OurProcessItem>
            ))}
          </ul>
        </div>
        <div className="common-box pt-0">
          <Letstalk />
        </div>
      </div>
    </div>
  );
};

export default page;
