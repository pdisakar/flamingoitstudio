import React from 'react';
import Image from 'next/image';
import { IMAGE_URL } from '@/lib/constants';

interface PagebannerProps {
  classes?: string;
  imagelink: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

const Pagebanner: React.FC<PagebannerProps> = ({
  classes = '',
  imagelink,
  alt,
  width = 1920,
  height = 750,
  priority = false,
}) => {
  return (
    <div className={`banner ${classes}`}>
      <Image
        src={`${IMAGE_URL}${imagelink}`}
        alt={alt}
        width={width}
        height={height}
        className="object-cover rounded-lg"
        priority={priority}
      />
    </div>
  );
};

export default Pagebanner;
