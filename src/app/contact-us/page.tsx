import Letstalk from '@/components/Letstalk/Letstalk';
import React from 'react';

const page = () => {
  return (
    <div className="container">
      <div className="common-box">
        <div className="page-title">
          <h1 className="max-w-[1231px]">Contact Us</h1>
          <p className="text-xl mt-8 md:mt-12  lg:mt-16">
            Have a web development project in mind? We’re here to help. At
            Flamingo IT Studio, we specialize in building high-performing,
            user-focused websites that drive results. Whether you need a sleek
            business site, a custom platform, or a complete digital revamp — our
            team is ready to craft solutions tailored to your goals.
          </p>
        </div>
        <div className="contact-container grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="contact-form">
            <form action="#">
              <div className="about-person grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                <input
                  type="text"
                  placeholder="First Name *"
                  required
                  className="placeholder:text-white border-b border-white focus:outline-none bg-transparent w-full pb-2 focus:placeholder:text-white/50"
                />

                <input
                  type="text"
                  placeholder="Last Name *"
                  required
                  className="placeholder:text-white border-b border-white focus:outline-none bg-transparent w-full pb-2 focus:placeholder:text-white/50"
                />

                <input
                  type="number"
                  placeholder="+977 **********"
                  required
                  className="placeholder:text-white border-b border-white focus:outline-none bg-transparent w-full pb-2 focus:placeholder:text-white/50 col-span-1 md:col-span-2 lg:col-span-1"
                />
              </div>

              <input
                type="text"
                placeholder="Email Address *"
                required
                className="placeholder:text-white border-b border-white focus:outline-none bg-transparent w-full pb-2 focus:placeholder:text-white/50 mt-8"
              />
              <input
                placeholder="Project Goals, features, and timeline? *"
                required
                className="placeholder:text-white border-b border-white focus:outline-none bg-transparent w-full pb-2 focus:placeholder:text-white/50 mt-8"
              />
              <div className="our-services mt-6 md:mt-8 lg:mt-12">
                <h4 className="text-lg font-medium mb-4">Services</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-white">
                  {[
                    'Web Design',
                    'Content Creation',
                    'UX Design',
                    'User Research',
                    'Web Development',
                    'Others',
                  ].map(skill => (
                    <label
                      key={skill}
                      className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="skills"
                        value="Others"
                        className="w-5 h-5 border border-white bg-transparent accent-white rounded-sm cursor-pointer"
                      />
                      {skill}
                    </label>
                  ))}
                </div>
              </div>
            </form>
          </div>
          <div className="contact-details">this is details</div>
        </div>
      </div>
      <div className="common-box">
        <Letstalk />
      </div>
    </div>
  );
};

export default page;
