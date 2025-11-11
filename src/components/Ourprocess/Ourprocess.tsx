import { OurProcessItem } from '../Motionanimations/Motionanimations';

const item = [
  {
    id: 1,
    title: 'Project Initiation',
    body: 'We begin by understanding your business goals, target audience, and technical needs. This phase ensures a clear vision, aligning expectations and gathering all necessary functional and non-functional requirements.',
  },
  {
    id: 2,
    title: 'Strategic Planning',
    body: 'Based on the analysis, we define the project scope, timeline, and allocate the right team and tools. This structured planning ensures efficient resource use and minimizes risks early on.',
  },
  {
    id: 3,
    title: 'Design & Development',
    body: 'We create user-centric designs and start coding based on approved wireframes. The focus is on intuitive UI, clean architecture, and building scalable, maintainable solutions tailored to your needs.',
  },
  {
    id: 4,
    title: 'Quality Testing',
    body: 'Before launch, we rigorously test for bugs, performance, security, and cross-device compatibility. This step guarantees the product meets high standards and delivers a reliable, smooth user experience.',
  },
  {
    id: 5,
    title: 'Launch & Deployment',
    body: 'Once tested and approved, we deploy the product to the live environment. We ensure a seamless transition with minimal downtime, following best practices for performance and stability.',
  },
  {
    id: 6,
    title: 'Support & Optimization',
    body: 'Post-launch, we monitor, maintain, and enhance your product. Through updates, performance tuning, and feature improvements, we ensure continued success and adaptability to changing user demands.',
  },
];

const Ourprocess = () => {
  return (
    <>
      <div className="home-title max-w-[1022.75px]">
        <h2>Within our dev process</h2>
        <span>
          Build seamless, high-performing websites with our expert development
          process.
        </span>
      </div>

      <ul className="our-process-container mt-10 md:mt-15 lg:mt-20">
        {item.map((process, index) => (
          <OurProcessItem
            key={process.id}
            index={index}>
            <div className="item relative z-10 flex items-center justify-between flex-wrap py-16 border-b border-white/15 first:border-t gap-4 hover:text-body-bg">
              <div className="process-title flex flex-wrap items-center gap-4 lg:gap-12">
                <span className="process-id text-[18px] md:text-[22px] lg:text-[26px]">
                  {String(process.id).padStart(2, '0')}.
                </span>

                <span className="process-title text-2xl md:text-3xl lg:text-5xl font-medium">
                  {process.title}
                </span>
              </div>

              <p className="process-body max-w-[813px] text-lg md:text-[22px] leading-[1.6]">
                {process.body}
              </p>
            </div>
          </OurProcessItem>
        ))}
      </ul>
    </>
  );
};

export default Ourprocess;
