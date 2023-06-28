import { redirect } from 'next/navigation';

type Props = {
  params: { id: string };
};

export default function ImageGalleryPageRedirect({ params }: Props) {
  redirect(`/product/${params.id}`);
}
