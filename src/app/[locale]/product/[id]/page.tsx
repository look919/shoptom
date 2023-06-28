import { ReactNode } from 'react';
import { db } from '@lib/db';
import { Divider } from '@ui';
import { ImageGallery } from '@ui/ImageGallery';
import { getImagePath } from '@utils/getImagePath';
import { generateProductPrice } from '@utils/product';
import { AddToCartForm } from './AddToCartForm';
import { ProductRating } from './ProductRating';
import { Review } from './Review';
import { WriteReview } from './WriteReview';

type Props = {
  params: { id: string };
};

const DetailsHeader = ({ children }: { children: ReactNode }) => (
  <h3 className='mt-12 text-2xl font-bold'>{children}</h3>
);

const DetailsContent = ({ children }: { children: ReactNode }) => <div className='mt-4 text-lg'>{children}</div>;

export default async function ProductPage({ params }: Props) {
  const productId = params.id;
  const product = await db.product.findFirstOrThrow({
    include: {
      images: true,
      dimensions: true,
      colors: true,
      features: true,
      reviews: true,
    },
    where: {
      id: productId,
    },
  });

  const images = product.images.map(image => getImagePath(image));

  const price = generateProductPrice(product.price);

  return (
    <main className='mx-20'>
      <div className='mt-12 flex items-center justify-center gap-x-12'>
        <ImageGallery images={images} />
        <div className='flex w-1/2 flex-col self-start'>
          <span className='mt-2 text-lg italic'>Producer: {product.producer}</span>
          <h1 className='mt-6 text-4xl'>{product.name}</h1>
          <h2 className='mt-6 text-4xl text-green-600'>{price}</h2>
          <ProductRating productId={params.id} reviews={product.reviews} />
          <Divider />
          <AddToCartForm product={product} />
        </div>
      </div>
      <Divider />
      <DetailsHeader>Description</DetailsHeader>
      <DetailsContent>{product.description}</DetailsContent>
      <DetailsHeader>Features</DetailsHeader>
      {product.features.map(feature => (
        <DetailsContent key={feature.name}>
          <span className='mr-2 text-xl'>●</span>
          <span>{feature.name}</span>
        </DetailsContent>
      ))}
      <DetailsHeader>Dimensions</DetailsHeader>
      {product.dimensions.map(dimension => (
        <DetailsContent key={dimension.name}>
          <span className='mr-2 text-xl'>●</span>
          <span>{dimension.name}</span>
        </DetailsContent>
      ))}

      <DetailsHeader>Reviews</DetailsHeader>
      <div className='-ml-2 mt-4'>
        <WriteReview productId={productId} />
      </div>

      {product.reviews.length ? (
        product.reviews.map(review => (
          <DetailsContent key={review.id}>
            <Review review={review} />
          </DetailsContent>
        ))
      ) : (
        <DetailsContent>
          <span>No reviews yet</span>
        </DetailsContent>
      )}
    </main>
  );
}
