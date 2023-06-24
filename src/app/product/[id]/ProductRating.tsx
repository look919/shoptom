import { Review } from '@prisma/client';
import { RatingStars } from './RatingStars';
import { WriteReview } from './WriteReview';

type Props = {
  productId: string;
  reviews: Review[];
};

export const ProductRating = ({ productId, reviews }: Props) => {
  const productHasReviews = reviews.length > 0;

  const averageRating = productHasReviews
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  return (
    <div className='mt-8 flex items-center text-lg'>
      {productHasReviews && <span className='mr-2'>{averageRating.toFixed(2)}</span>}
      <RatingStars rating={averageRating} />
      <span className='ml-2'>{productHasReviews ? `${reviews.length} Review(s)` : '(No reviews yet)'}</span>
      {!productHasReviews && <WriteReview productId={productId} />}
    </div>
  );
};
