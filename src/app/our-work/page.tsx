import Statistics from '@/components/Statistics/Statistics';

const page = () => {
  return (
    <div className="container">
      <div className=" common-box page-title">
        <h1 className="max-w-[1231px]">Web Development Case Study</h1>
        <article className="text-xl [&>p]:mt-7 [&>p:first-child]:mt-0 mt-8 md:mt-12  lg:mt-16">
          <p>
            At Flamingo IT Studio, we’re proud to present a showcase of the web
            development solutions we’ve crafted for clients across industries.
            This portfolio highlights our commitment to building powerful,
            user-focused digital experiences—from dynamic websites and robust
            web applications to custom backend systems and responsive
            interfaces.
          </p>
          <p>
            Every project reflects a unique challenge we’ve tackled with
            strategy, creativity, and technical precision. Dive in to explore
            how we’ve helped businesses transform their online presence and
            achieve real, measurable results through smart development and
            scalable design.
          </p>
        </article>
      </div>
      <div className="common-box pt-0">
        <Statistics />
      </div>
      <div className="common-box pt-0">
        <div className=" page-title">
          <h1 className="max-w-[1231px]">Web Development Portfolio</h1>
          <p className="text-xl [&>p]:mt-7 [&>p:first-child]:mt-0 mt-8 md:mt-12  lg:mt-16">
            Step into the world of real results with Flamingo IT Studio’s Web
            Development Case Studies. These stories go beyond code—they reveal
            how strategic thinking, innovative technology, and a user-first
            mindset come together to solve complex business problems and deliver
            seamless digital experiences. From performance-driven websites to
            custom-built applications, each case study uncovers the challenges
            we faced, the smart solutions we engineered, and the tangible impact
            our development work has had on clients. Discover how our expertise
            transforms ideas into functional, future-ready web platforms.
          </p>
        </div>
        <div className="out-projets mt-8 md:mt-12  lg:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <p>sakar</p>
          <p>sakar</p>
          <p>sakar</p>
        </div>
      </div>
    </div>
  );
};

export default page;
