import Image from 'next/image';
import Link from 'next/link';
import { DashboardProduct } from '@domainTypes/Product';
import { getImageFromBucket } from '@lib/getImageFromBucket';
import { generateProductPrice, getProductSizes } from '@utils/product';

type Props = {
  product: DashboardProduct;
};

export async function Product({ product }: Props) {
  const img = await getImageFromBucket(product.images[0].url);
  const price = generateProductPrice(product.price);
  const sizes = getProductSizes(product);

  return (
    <Link href={`/product/${product.id}`} className='relative flex w-80 cursor-pointer flex-col p-6'>
      <div className='absolute inset-0 border border-transparent opacity-0 transition-opacity duration-700 hover:border-slate-200 hover:opacity-100' />
      <Image src={img} width='320' height='320' className='w-120 overflow-visible' alt='product photo' />
      <div className='flex h-full flex-col items-center'>
        <span className='mt-2 italic'>{product.producer}</span>
        <h2 className='mb-4 mt-2 text-center text-lg'>{product.name}</h2>
        <div className='-mb-2 mt-auto flex flex-col items-center'>
          <span>{price}</span>
          <div className='flex justify-evenly'>
            {sizes.map(size => (
              <span className='mx-1 mt-2 flex h-8 w-8 items-center justify-center border border-slate-200' key={size}>
                {size}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
