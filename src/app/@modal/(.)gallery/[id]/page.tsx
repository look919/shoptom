import { db } from '@lib/db';
import { getImageFromBucket } from '@lib/getImageFromBucket';
import { ImageGalleryDialog } from './ImageGalleryDialog';

type Props = {
  params: { id: string };
};

export default async function ImageGalleryModalInterceptedPage({ params }: Props) {
  const product = await db.product.findFirstOrThrow({
    include: {
      images: true,
    },
    where: {
      id: params.id,
    },
  });

  const images = Array.isArray(product.images)
    ? await Promise.all(product.images.map(async image => getImageFromBucket(image.url)))
    : [];

  return <ImageGalleryDialog productId={params.id} images={images} />;
}
