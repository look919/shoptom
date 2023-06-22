import Image from 'next/image';
import { getImageFromBucket } from '@lib/getImageFromBucket';
import { generateProductPrice } from '@utils/product';
import { CartProduct } from '../../types/Product';

type Props = {
  product: CartProduct;
};

export const CartItem = async ({ product }: Props) => {
  const productImage = await getImageFromBucket(product.details.images[0].url);

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
