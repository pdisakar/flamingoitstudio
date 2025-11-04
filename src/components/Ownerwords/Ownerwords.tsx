import { OwnerWordsLines } from '../Motionanimations/Motionanimations';
import Image from 'next/image';
import owner1 from '../../../public/owners/owner.webp';
import owner2 from '../../../public/owners/owner2.webp';

const owners = [
  { id: 1, img: owner1, name: 'Owner One' },
  { id: 2, img: owner2, name: 'Owner Two' },
];

const lines = [
  'Welcome to Flamingo IT Studio,',
  'where we transform your ideas into captivating reality,',
  'through innovative web development solutions.',
  "Here are some of the top brands we've collaborated with,",
  'to craft standout digital experiences.',
];

export default function Ownerwords() {
  return (
    <div className="common-box py-12">
      <div className="container grid grid-cols-4 gap-6">
        <div className="founded-container col-span-4 md:col-span-1">
          <ul className="flex items-center [&>li:not(:first-child)]:-ml-3">
            {owners.map(owner => (
              <li key={owner.id}>
                <Image
                  src={owner.img}
                  height={90}
                  width={90}
                  alt={owner.name}
                  className="rounded-full outline-2 outline-white"
                />
              </li>
            ))}
          </ul>

          <div className="founded-title [&>span]:block leading-[1.3] text-xl md:text-2xl uppercase [&>span:last-child]:font-bold mt-8">
            <span>Founders of</span>
            <span>Flamingo It Studio</span>
          </div>
        </div>
        <OwnerWordsLines
          lines={lines}
          className="founder-words text-[clamp(20px,5vw,54px)] leading-[1.3] flex flex-col gap-2 col-span-4 md:col-span-3"
        />
      </div>
    </div>
  );
}
