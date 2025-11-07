'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import logo from '../../public/logo.svg';

const navItems = [
  { label: 'About us', href: '/about' },
  { label: 'Who Are We', href: '/who-we-are' },
  { label: 'Our Work', href: '/our-work' },
  { label: 'Services', href: '/services' },
];

const socialMedia = [
  { id: 1, icon: 'facebook', href: 'https://facebook.com' },
  { id: 2, icon: 'pintrest', href: 'https://pinterest.com' },
  { id: 3, icon: 'instagram', href: 'https://instagram.com' },
  { id: 4, icon: 'x', href: 'https://x.com' },
];

const Footer = () => {
  return (
    <div className="footer bg-white z-10 text-black relative before:-top-1 before:absolute before:content-[''] before:h-[300px] before:w-full before:bg-footerbg before:bg-no-repeat before:-z-10">
      <div className="container">
        <div className="footer-container max-w-6xl mx-auto">
          <div className="newspaper bg-white py-8 px-8 md:py-12 md:px-12 lg:py-16 lg:px-32 shadow-lg flex gap-6 flex-wrap items-center justify-between rounded-lg">
            <span className=" text-3xl font-semibold">
              Subscribe Newsletters
            </span>

            <form
              action="#"
              className="border border-border w-fit rounded-lg py-1 pl-6 pr-1">
              <input
                type="text"
                placeholder="Enter your email"
                className="outline-none"
              />
              <button className="py-4 px-8 bg-primary text-white rounded-lg">
                Subscribe Now
              </button>
            </form>
          </div>

          <div className="main-footer py-10 flex items-center justify-between flex-wrap gap-8">
            <ul className="nav-item flex items-center flex-wrap gap-8">
              {navItems.map((item, idx) => (
                <li key={idx}>
                  <Link
                    className="hover:text-primary hover:underline transform transition-all duration-100"
                    href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="social-media flex items-center gap-6">
              {socialMedia.map(({ id, icon, href }) => (
                <li key={id}>
                  <Link
                    href={href}
                    className="text-body-bg hover:text-primary transform transition-all duration-100"
                    target="_blank"
                    aria-label={icon}>
                    <svg
                      width={24}
                      height={24}
                      fill="currentColor">
                      <use xlinkHref={`/icons.svg#${icon}`} />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-bottom flex items-center flex-wrap justify-between gap-6 py-6 border-t border-border">
            <span className="block">
              © 2019 Flamingo It Studio. All rights reserved.
            </span>
            <div className="company-logo">
              <Image
                src={logo}
                height={80}
                width={70.04}
                alt="Flamingo It Studio"
              />
            </div>
            <ul className=' flex gap-6'>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
