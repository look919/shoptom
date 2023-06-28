import { twMerge } from 'tailwind-merge';
import { Icons } from '@ui';

type RatingStarsProps = {
  rating: number;
};

export const RatingStars = ({ rating }: RatingStarsProps) => {
  const getStarStyles = (starRating: number) => rating >= starRating && 'fill-yellow-500 stroke-black';

  return (
    <>
      {[1, 2, 3, 4, 5].map(starRating => (
        <Icons.star key={starRating} className={twMerge('mx-0.25 h-6 w-6', getStarStyles(starRating))} />
      ))}
    </>
  );
};
