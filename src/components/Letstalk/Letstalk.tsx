import React from 'react';
import Image from 'next/image';
import owner1 from '../../../public/owners/owner.webp';
import owner2 from '../../../public/owners/owner2.webp';
import Link from 'next/link';

const owners = [
  { id: 1, img: owner1, name: 'Owner One' },
  { id: 2, img: owner2, name: 'Owner Two' },
];

const Letstalk = () => {
  return (
    <>
      <div className="home-title">
        <h2 className="text-[clamp(50px,10vw,164px)] leading-[1.1] font-semibold font-secondary capitalize">
          Got Project in Mind?
          <Link
            href={'/contact-us'}
            className="text-primary underline relative inline-block hover:text-body transform transition-all duration-100">
            Lets Talk!
            <ul className="flex  items-center [&>li:not(:first-child)]:-ml-3 absolute top-[20%] -right-[85px] md:-right-[100px] lg:top-[10%] lg:-right-[5%] xl:top-[0%] xl:-right-[10%]">
              {owners.map(owner => (
                <li
                  key={owner.id}
                  className="relative h-[45px] w-[45px] md:h-[55px] md:w-[55px] lg:h-[65px] lg:w-[65px] xl:h-[90px] xl:w-[90px] rounded-full border-3 border-body-bg overflow-hidden bg-body-bg">
                  <Image
                    src={owner.img}
                    alt={owner.name}
                    fill
                    className="rounded-full object-cover w-full h-full"
                  />
                </li>
              ))}
            </ul>
          </Link>
        </h2>
      </div>
      <div className="our-mail text-lg md:text-xl lg:text-2xl flex items-center gap-2">
        <svg
          width={25}
          height={25}
          fill="currentColor">
          <use xlinkHref="/icons.svg#ourmail" />
        </svg>
        hello@flamingoitstudio.com
      </div>
    </>
  );
};

export default Letstalk;
