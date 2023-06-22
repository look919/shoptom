import React, { useEffect } from 'react';
import Image from 'next/image';
import { getImageFromBucket } from '@lib/getImageFromBucket';
import { CartProduct } from '../../../types/Product';
import { generateProductPrice } from '@utils/product';

type Props = {
  product: CartProduct;
  withImage?: boolean;
};

export const CartItem = async ({ withImage = false, product }: Props) => {
  const [productImage, setProductImage] = React.useState<string | null>(null);
  // const productImage = withImage
  //   ? await getImageFromBucket(product.details.images[0].url)
  //   : null;

  useEffect(() => {
    const fetchProductImage = async () => {
      if (withImage) {
        const image = await getImageFromBucket(product.details.images[0].url);
        setProductImage(image);
      }
    };
    fetchProductImage();
  }, [productImage, withImage, product.details.images]);

  return (
    <div className='flex items-center'>
      {productImage && (
        <Image src={productImage} width={120} height={120} alt='product photo' className='mr-4 h-28 w-28 pb-4' />
      )}
      <div className='mb-4 flex w-full flex-col border-b border-slate-400 pb-2 text-start'>
        <span className='font-bold'>{product.details.producer}</span>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <div className='mr-1'>{`Size: ${product.size}`}</div>
            <div className='mx-1 h-4 w-4' style={{ backgroundColor: product.color }} />
          </div>
          <span>{`Quantity: ${product.quantity}x ${generateProductPrice(product.details.price)}`}</span>
        </div>
        <div className='flex items-center justify-between'>
          <div className='text-lg'>{product.details.name}</div>
          <span className='text-lg text-emerald-600'>
            {`= ${generateProductPrice(product.details.price * product.quantity)}`}
          </span>
        </div>
      </div>
    </div>
  );
};
