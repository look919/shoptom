'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Icons } from '@ui/Icons';

export const ImageGallery = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const lastImageIndex = selectedImage === images[images.length - 1];
  const firstImageIndex = selectedImage === images[0];

  const handleArrowUpClick = () => {
    if (firstImageIndex) return;

    setSelectedImage(images[images.indexOf(selectedImage) - 1]);
  };

  const handleArrowDownClick = () => {
    if (lastImageIndex) return;

    setSelectedImage(images[images.indexOf(selectedImage) + 1]);
  };

  return (
    <>
      <div className='flex h-[600px] w-32 flex-col items-center justify-center gap-x-2 gap-y-6'>
        <Icons.arrowUp
          className='h-12 w-12 cursor-pointer'
          onClick={handleArrowUpClick}
          style={{
            pointerEvents: firstImageIndex ? 'none' : 'auto',
            cursor: firstImageIndex ? 'default' : 'pointer',
            stroke: firstImageIndex ? 'gray' : 'white',
          }}
        />
        {images.map(image => (
          <Image
            key={image}
            src={image}
            alt='image gallery item'
            width={100}
            height={100}
            className='cursor-pointer rounded-md p-2'
            style={{
              border: selectedImage === image ? '1px solid white' : '',
            }}
            onClick={() => setSelectedImage(image)}
          />
        ))}
        <Icons.arrowDown
          className='h-12 w-12'
          onClick={handleArrowDownClick}
          style={{
            pointerEvents: lastImageIndex ? 'none' : 'auto',
            cursor: lastImageIndex ? 'default' : 'pointer',
            stroke: lastImageIndex ? 'gray' : 'white',
          }}
        />
      </div>
      <div className='flex h-[600px] justify-center'>
        <Image src={selectedImage} alt='selected image' width={800} height={800} className='max-w-xl rounded-xl ' />
      </div>
    </>
  );
};
