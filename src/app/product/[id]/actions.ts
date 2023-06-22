'use server';

import { revalidateTag } from 'next/cache';
import { db } from '@lib/db';
import { WriteReviewFormSchema } from './WriteReview';

export async function postReview({
  userId,
  productId,
  data,
}: {
  userId: string;
  productId: string;
  data: WriteReviewFormSchema;
}) {
  if (!userId) {
    return {
      status: 401,
      statusText: 'You must be logged in to send a review',
    };
  }

  if (!productId) {
    return {
      status: 500,
      statusText: 'There was a problem with creating your review, try again later',
    };
  }

  const review = await db.review.create({
    data: {
      ...data,
      authorId: userId,
      productId,
    },
  });

  revalidateTag(`reviews-${productId}`);

  return { status: 201, statusText: 'OK', reviewId: review.id };
}
