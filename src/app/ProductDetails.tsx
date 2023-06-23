'use client';

import { useState } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { DashboardProduct } from '@domainTypes/Product';
import { generateProductPrice, getProductSizes } from '@utils/product';

type Props = {
  product: DashboardProduct;
};

export const ProductDetails = ({ product }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const price = generateProductPrice(product.price);
  const sizes = getProductSizes(product);

  return (
    <>
      <div
        className={twMerge(
          'absolute inset-0 border border-transparent opacity-0 transition-opacity duration-700',
          isHovered && 'border-slate-200 opacity-100',
        )}
      />
      <Link
        href={`/product/${product.id}`}
        className='z-10 flex h-full flex-col items-center '
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className='mt-2 italic'>{product.producer}</span>
        <h2 className='mb-4 mt-2 text-center text-lg'>{product.name}</h2>
        <div className='-mb-2 mt-auto flex flex-col items-center'>
          <span className='text-green-600'>{price}</span>
          <div className='flex justify-evenly'>
            {sizes.map(size => (
              <span className='mx-1 mt-2 flex h-8 w-8 items-center justify-center border border-slate-600' key={size}>
                {size}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </>
  );
};
