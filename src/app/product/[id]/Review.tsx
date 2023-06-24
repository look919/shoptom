import Image from 'next/image';
import { clerkClient } from '@clerk/nextjs';
import { Review as IReview } from '@prisma/client';
import { RatingStars } from './RatingStars';

type ReviewsProps = {
  review: IReview;
};

export const Review = async ({ review }: ReviewsProps) => {
  const user = await clerkClient.users.getUser(review.authorId);

  return (
    <div className='mb-2 flex flex-col gap-2 border-t border-slate-500 p-2'>
      <div className='-ml-1 flex items-center gap-0.5 pt-2'>
        <div className='flex items-center gap-2'>
          {user && (
            <Image
              height={32}
              width={32}
              className='h-8 w-8 rounded-full'
              src={user.profileImageUrl}
              alt='review-user-photo'
            />
          )}
          <span className='mr-4 text-lg font-bold'>{`${user.firstName} ${user.lastName}`}</span>
        </div>
        <RatingStars rating={review.rating} />
      </div>
      <p className='text-lg font-bold'>{review.title}</p>
      <p className=''>{review.body}</p>
    </div>
  );
};
