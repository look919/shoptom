'use client';

import { useRef, MouseEvent } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { Button } from '@ui';
import { ImageGallery } from '@ui/ImageGallery';

type ImageGalleryDialogProps = {
  productId: string;
  images: string[];
};

export const ImageGalleryDialog = ({ productId, images }: ImageGalleryDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleClickOutside = (e: MouseEvent) => {
    const dialogDimensions = dialogRef.current!.getBoundingClientRect();

    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      router.back();
    }
  };

  if (pathname !== `/gallery/${productId}`) {
    return null;
  }

  return (
    <section className='fixed left-0 top-0 z-50 h-screen w-screen' onClick={handleClickOutside}>
      <dialog
        className={twMerge(
          'fixed left-1/2 top-1/2 flex w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 flex-col ',
          'rounded border border-slate-200 bg-zinc-900 p-6',
          'backdrop:bg-slate-700 backdrop:bg-opacity-30',
        )}
        ref={dialogRef}
      >
        <div className='flex justify-evenly'>
          <ImageGallery images={images} />
        </div>
        <Link href={`/product/${productId}`} className='mt-6 self-end'>
          <Button>Show details</Button>
        </Link>
      </dialog>
    </section>
  );
};
