import Image from 'next/image';
import logo from '../../public/logo.svg';
import Link from 'next/link';

const Header = () => {
  return (
    <div
      className="header container flex items-center justify-between pt-10"
      id="header">
      <div className="company-logo">
        <Image
          src={logo}
          height={80}
          width={70.04}
          alt="Flamingo It Studio"
        />
      </div>
      <nav>
        <ul className="flex items-center [&>li]:px-9 text-2xl font-medium">
          <li>Services</li>
          <li>Who We Are</li>
          <li>Our Works</li>
          <li>Blog</li>
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
  );
};

export default Header;
