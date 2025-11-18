import Letstalk from '@/components/Letstalk/Letstalk';
import React from 'react';
import { getGlobalData } from '@/services/network_requests';

export default async function page() {
  const [globalData] = await Promise.all([getGlobalData()]);

  console.log(globalData);

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
        <div className="contact-container grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-14">
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
                  className="placeholder:text-white border-b border-white focus:outline-none bg-transparent w-full pb-2 focus:placeholder:text-white/50 col-span-1 md:col-span-2 lg:col-span-1 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]"
                />
              </div>
              <input
                type="email"
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
                <h4 className="text-xl font-medium mb-4">Services</h4>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-white">
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
              <button className=" w-full py-3 bg-primary  mt-6 md:mt-8 lg:mt-12">
                Send Message
              </button>
            </form>
          </div>
          <div className="contact-details space-y-6 md:space-y-8 lg:space-y-10">
            <div className="chat-with-us">
              <h3 className=" text-2xl">Chat With Us</h3>
              <p className="mt-2">Speak to our friendly team via live chat</p>
              <div className="email-us">
                <a
                  href={`mailto:${globalData?.email}`}
                  className=" underline text-base flex gap-3 items-center">
                  <svg
                    width={18}
                    height={18}
                    fill="currentColor">
                    <use xlinkHref="/icons.svg#contact-us-email" />
                  </svg>
                  Shoot us an email
                </a>
              </div>
              <div className="whatsapp-us mt-2">
                <a
                  href={`https://wa.me/${globalData?.mobile}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" underline text-base flex gap-3 items-center">
                  <svg
                    width={18}
                    height={18}
                    fill="currentColor">
                    <use xlinkHref="/icons.svg#contact-us-whatsapp" />
                  </svg>
                  Message on WhatsApp
                </a>
              </div>
            </div>

            <div className="make-a-call">
              <h3 className=" text-2xl">Make a Call</h3>
              <p className="mt-2">Call us Sun-Sat from 10 AM to 5 PM</p>

              <div className="call-us">
                <a
                  href={`tel:${globalData.mobile}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" underline text-base flex gap-3 items-center">
                  <svg
                    width={18}
                    height={18}
                    fill="currentColor">
                    <use xlinkHref="/icons.svg#contact-us-call" />
                  </svg>
                  +977 {globalData.mobile}
                </a>
              </div>
            </div>

            <div className="visit-us">
              <h3 className=" text-2xl">Visit Us </h3>
              <p className="mt-2">Talk with us in person at our Location</p>

              <div className="our-location">
                <a
                  href={'#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" underline text-base flex gap-3 items-center">
                  <svg
                    width={18}
                    height={18}
                    fill="currentColor">
                    <use xlinkHref="/icons.svg#contact-us-location" />
                  </svg>{' '}
                  {globalData?.address}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="common-box pt-0">
        <Letstalk />
      </div>
    </div>
  );
}
