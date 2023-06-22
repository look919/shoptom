import { NextResponse } from 'next/server';
import { db } from '@lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');

  if (!productId) {
    return NextResponse.json(null, {
      status: 500,
      statusText: 'There was a problem with getting reviews, try again later',
    });
  }

  const reviews = await db.review.findMany({
    where: {
      productId,
    },
  });

  return NextResponse.json(reviews);
}
