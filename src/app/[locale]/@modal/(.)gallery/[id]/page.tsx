import { db } from '@lib/db';
import { getImagePath } from '@utils/getImagePath';
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

  const images = product.images.map(image => getImagePath(image));

  return <ImageGalleryDialog productId={params.id} images={images} />;
}
