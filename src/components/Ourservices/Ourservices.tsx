import {
  OurServicesProvider,
  OurServicesImage,
  OurServicesFaqs,
} from '../Motionanimations/Motionanimations';

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
  return (
    <section className="common-box pt-0">
      <div className="container">
        <div className="home-title max-w-[895.59px]">
          <h2>Explore Our Services</h2>
        </div>
        <OurServicesProvider
          images={images}
          faqs={faqs}>
          <div className="our-service-container grid gap-10 md:grid-cols-2 items-start">
            <div className="image-section flex flex-col items-center justify-center">
              <span className="block text-xl md:text-2xl lg:text-[35px] leading-[1.4]  md:mb-6">
                Transform your brand with our cutting-edge web development
                solutions and seamless digital experiences.
              </span>
              <OurServicesImage />
            </div>
            <div className="faqs-section">
              <OurServicesFaqs />
            </div>
          </div>
        </OurServicesProvider>
      </div>
    </section>
  );
};

export default Ourservices;
