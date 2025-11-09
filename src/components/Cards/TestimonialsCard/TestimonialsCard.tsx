import Image, { StaticImageData } from 'next/image';

interface TestimonialsCardProps {
  img: StaticImageData | string;
  author: string;
  position: string;
  body: string;
}

const TestimonialsCard = ({
  img,
  author,
  position,
  body,
}: TestimonialsCardProps) => {
  return (
    <div className="bg-white/10 md:border-l border-white/15 p-10 lg:p-10 xl:p-20 h-full hover:cursor-grab">
      <div className="image-slot aspect-70/70">
        <Image
          src={img}
          alt={author}
          fill
          className="object-contain"
        />
      </div>

      <p className="text-[20px] md:text-[22px] lg:text-[28px]">"{body}"</p>

      <div className="mt-6">
        <h3 className="text-lg lg:text-xl">{author}</h3>
        <span className="text-sm opacity-70">{position}</span>
      </div>
    </div>
  );
};

export default TestimonialsCard;
