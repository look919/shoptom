import React from 'react';
import { Product as IProduct, Image, Dimension } from '@prisma/client';
import { getImagePath } from '@utils/getImagePath';
import { ProductDetails } from './ProductDetails';
import { ProductImage } from './ProductImage';

type Props = {
  product: IProduct & {
    images: Image[];
    dimensions: Dimension[];
  };
};

export function DashboardProduct({ product }: Props) {
  const imgSrc = getImagePath(product.images[0]);

  return (
    <section className='relative grid w-80 grid-rows-[repeat(2,200px)] flex-col p-6'>
      <ProductImage src={imgSrc} width={320} height={320} productId={product.id} />
      <ProductDetails product={product} />
    </section>
  );
}
