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
    </div>
  );
};

export default page;
