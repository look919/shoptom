import { DashboardProduct } from '@domainTypes/Product';
import { getImagePath } from '@utils/getImagePath';
import { ProductDetails } from './ProductDetails';
import { ProductImage } from './ProductImage';

type Props = {
  product: DashboardProduct;
};

export async function Product({ product }: Props) {
  const imgSrc = getImagePath(product.images[0]);

  return (
    <section className='relative grid w-80 grid-rows-[repeat(2,200px)] flex-col p-6'>
      <ProductImage src={imgSrc} width={320} height={320} productId={product.id} />
      <ProductDetails product={product} />
    </section>
  );
}
