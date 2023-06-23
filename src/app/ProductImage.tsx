import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

type ProductImageProps = {
  src: string;
  width: number;
  height: number;
  productId: string;
  className?: string;
};

export const ProductImage = ({ productId, className, ...props }: ProductImageProps) => {
  return (
    <Link href={`/gallery/${productId}`}>
      <Image
        className={twMerge('w-120 relative z-10 overflow-visible', className)}
        alt='product photo'
        priority
        {...props}
      />
    </Link>
  );
};
