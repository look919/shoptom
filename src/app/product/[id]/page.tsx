import type { Product } from '@domainTypes/Product';
import { db } from '@lib/db';
import { getImageFromBucket } from '@lib/getImageFromBucket';
import { Divider } from '@ui';
import { generateProductPrice } from '@utils/product';
import { AddToCartForm } from './AddToCartForm';
import { ImageGallery } from './ImageGallery';
import { ProductRating } from './ProductRating';

type Props = {
  params: { id: string };
};

export default async function ProductPage({ params }: Props) {
  const product: Product = await db.product.findFirstOrThrow({
    include: {
      images: true,
      dimensions: true,
      colors: true,
      features: true,
      reviews: true,
    },
    where: {
      id: params.id,
    },
  });

  const images = await Promise.all(product.images.map(async image => getImageFromBucket(image.url)));

  const price = generateProductPrice(product.price);

  return (
    <main className='mx-20'>
      <div className='mt-12 flex items-center justify-center gap-x-12'>
        <ImageGallery images={images} />
        <div className='flex w-1/2 flex-col self-start'>
          <span className='mt-2 text-lg italic'>Producer: {product.producer}</span>
          <h2 className='mt-6 text-4xl'>{product.name}</h2>
          <h2 className='mt-6 text-4xl text-green-600'>{price}</h2>
          <ProductRating productId={params.id} />
          <Divider />
          <AddToCartForm product={product} />
        </div>
      </div>
      <Divider />
      <div className='mt-12 text-2xl font-bold'>Description</div>
      <div className='mt-4 text-justify text-lg'>{product.description}</div>
      <div className='mt-12 text-2xl font-bold'>Features</div>
      {product.features.map(feature => (
        <div key={feature.name} className='mt-4 text-lg'>
          <span className='mr-2 text-xl'>●</span>
          <span>{feature.name}</span>
        </div>
      ))}
      <div className='mt-12 text-2xl font-bold'>Dimensions</div>
      {product.dimensions.map(dimension => (
        <div key={dimension.name} className='mt-4 text-lg'>
          <span className='mr-2 text-xl'>●</span>
          <span>{dimension.name}</span>
        </div>
      ))}
    </main>
  );
}
