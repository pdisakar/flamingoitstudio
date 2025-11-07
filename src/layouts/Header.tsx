'use client';
import Image from 'next/image';
import logo from '../../public/logo.svg';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const mobileMenuItems = [
  { title: 'Services', href: 'services' },
  { title: 'Who We Are', href: 'who-we-are' },
  { title: 'Our Works', href: 'our-work' },
  { title: 'Blogs', href: 'blogs' },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [animateCloseBtn, setAnimateCloseBtn] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      const timer = setTimeout(() => {
        setAnimateCloseBtn(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setAnimateCloseBtn(false);
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <div
        className="header container hidden lg:flex items-center justify-between pt-10"
        id="header">
        <div className="company-logo">
          <Link href={'/'}>
            <Image
              src={logo}
              height={80}
              width={70.04}
              alt="Flamingo It Studio"
            />
          </Link>
        </div>
        <nav>
          <ul className="flex items-center [&>li]:px-9 text-2xl font-medium">
            {mobileMenuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="contact-us-btn ">
          <Link
            href="#"
            className="group flex items-center gap-5 bg-primary rounded-full p-1.5 pl-8 text-2xl">
            Let's Start
            <div className="action-btn h-16 w-16 bg-[#993A0A] flex items-center justify-center rounded-full">
              <svg
                width={18}
                height={18}
                className=" transform transition-transform duration-300 ease-in-out group-hover:-rotate-45"
                fill="currentColor">
                <use xlinkHref="/icons.svg#arrow45" />
              </svg>
            </div>
          </Link>
        </div>
      </div>

      <div
        className="header container flex lg:hidden items-center justify-between pt-5"
        id="mobile-header">
        <div className="company-logo">
          <Image
            src={logo}
            height={60}
            width={52}
            alt="Flamingo It Studio"
          />
        </div>
        <button
          className="mobile-menu-button focus:outline-none flex items-center gap-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-pressed={isMobileMenuOpen ? 'true' : 'false'}>
          {isMobileMenuOpen ? (
            <span className="text-xl font-medium">Close</span>
          ) : (
            <span className="text-xl font-medium">Open</span>
          )}
          <svg
            className="w-6 h-6 fill-current pointer-events-none"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg">
            <rect
              className={`origin-center -translate-y-[5px] translate-x-[7px] transition-all duration-300 ease-custom-1 ${
                isMobileMenuOpen ? 'translate-x-0 translate-y-0 rotate-315' : ''
              }`}
              y="7"
              width="9"
              height="2"
              rx="1"></rect>
            <rect
              className={`origin-center transition-all duration-300 ease-custom-2 ${
                isMobileMenuOpen ? 'rotate-45' : ''
              }`}
              y="7"
              width="16"
              height="2"
              rx="1"></rect>
            <rect
              className={`origin-center translate-y-[5px] transition-all duration-300 ease-custom-1 ${
                isMobileMenuOpen ? 'translate-y-0 rotate-135' : ''
              }`}
              y="7"
              width="9"
              height="2"
              rx="1"></rect>
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay lg:hidden bg-body-bg fixed top-0 left-0 w-full h-full z-40 flex flex-col items-center justify-center">
          <button
            className="absolute top-9 right-3.5 focus:outline-none flex items-center gap-2"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
            aria-pressed="true">
            <span className="text-xl font-medium">Close</span>

            <svg
              className="w-6 h-6 fill-current pointer-events-none"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg">
              <rect
                className={`origin-center transition-all duration-300 ease-custom-1 ${
                  animateCloseBtn
                    ? 'translate-x-0 translate-y-0 rotate-315'
                    : '-translate-y-[5px] translate-x-[7px]'
                }`}
                y="7"
                width="9"
                height="2"
                rx="1"></rect>
              <rect
                className={`origin-center transition-all duration-300 ease-custom-2 ${
                  animateCloseBtn ? 'rotate-45' : ''
                }`}
                y="7"
                width="16"
                height="2"
                rx="1"></rect>
              <rect
                className={`origin-center transition-all duration-300 ease-custom-1 ${
                  animateCloseBtn
                    ? 'translate-y-0 rotate-135'
                    : 'translate-y-[5px]'
                }`}
                y="7"
                width="9"
                height="2"
                rx="1"></rect>
            </svg>
          </button>

          <ul className="flex flex-col items-center text-4xl font-medium space-y-8">
            {mobileMenuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
