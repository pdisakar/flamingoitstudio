const Herosection = () => {
  return (
    <section className="common-box">
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
            <p className=" border border-white rounded-full bg-white/10 relative">
              <span className="h-7 w-7 bg-primary border border-white rounded-full flex items-center justify-center absolute top-1/2 -left-3.5 -translate-y-1/2 leading-[100%]">
                &
              </span>
              Development
            </p>
          </div>
        </div>
        <div className="hero-title">Unmatched Web Design</div>
      </div>
    </section>
  );
};

export default Herosection;
