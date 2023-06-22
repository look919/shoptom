import { twMerge } from 'tailwind-merge';
import { Review } from '@prisma/client';
import { Icons } from '@ui/Icons';
import { WriteReview } from './WriteReview';

type Props = {
  productId: string;
};

export const ProductRating = async ({ productId }: Props) => {
  const reviews: Review[] = await fetch(`${process.env.API_KEY}/reviews?productId=${productId}`, {
    cache: 'no-cache',
    next: {
      tags: [`reviews-${productId}`],
    },
  }).then(res => res.json());

  const productHasReviews = reviews.length > 0;

  const averageRating = productHasReviews
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  const getStarStyles = (rating: number) => averageRating >= rating && 'fill-yellow-500 stroke-black';

  return (
    <div className='mt-8 flex items-center text-lg'>
      {productHasReviews && <span className='mr-2'>{averageRating.toFixed(2)}</span>}
      {[1, 2, 3, 4, 5].map(rating => (
        <Icons.star key={rating} className={twMerge('mx-0.25 h-6 w-6', getStarStyles(rating))} />
      ))}
      <span className='ml-2'>{productHasReviews ? `${reviews.length} Review(s)` : '(No reviews yet)'}</span>
      {!productHasReviews && <WriteReview productId={productId} />}
    </div>
  );
};
