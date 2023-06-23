'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { Icons } from '@ui';

type ProductImageProps = {
  src: string;
  width: number;
  height: number;
  productId: string;
  className?: string;
};

export const ProductImage = ({ productId, className, ...props }: ProductImageProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link
      href={`/gallery/${productId}`}
      className='relative flex w-full flex-col items-center'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        className={twMerge(
          'z-10 aspect-[4/3] w-60 overflow-visible brightness-90',
          isHovered && 'brightness-50',
          className,
        )}
        alt='product photo'
        priority
        {...props}
      />
      <div
        className={twMerge(
          'absolute left-1/2 top-1/2 z-20 flex flex-col items-center',
          '-translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity',
          isHovered && 'opacity-100',
        )}
      >
        <Icons.gallery className='h-16 w-16 fill-slate-700 text-slate-300' />
        <span className='text-center text-sm text-slate-300'>View gallery</span>
      </div>
    </Link>
  );
};
