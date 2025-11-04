import {
  HeroLeftBackground,
  HeroRightBackground,
  HeroTechItem,
} from '../Motionanimations/Motionanimations';

const techWeUse = [
  { name: 'React', icon: 'react' },
  { name: 'Next.js', icon: 'next' },
  { name: 'Laravel', icon: 'laravel' },
  { name: 'HTML', icon: 'html' },
];

const Herosection = () => {
  return (
    <section className="common-box relative overflow-hidden">
      <HeroLeftBackground />
      <HeroRightBackground />
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
            <p className="border border-white rounded-full bg-white/10 relative">
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
          <span className="block max-w-[300px] text-4xl leading-[1.3] text-body/80">
            Developing the Website for Tomorrow
          </span>

          <ul className="tech-container flex items-center">
            {techWeUse.map(tech => (
              <HeroTechItem
                key={tech.name}
                name={tech.name}
                icon={tech.icon}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Herosection;
