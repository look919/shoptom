import { DashboardProduct } from '@domainTypes/Product';
import { getImageFromBucket } from '@lib/getImageFromBucket';
import { ProductDetails } from './ProductDetails';
import { ProductImage } from './ProductImage';

type Props = {
  product: DashboardProduct;
};

export async function Product({ product }: Props) {
  const img = await getImageFromBucket(product.images[0].url);

  return (
    <section className='relative flex w-80 flex-col p-6'>
      <ProductImage src={img} width={320} height={320} productId={product.id} />
      <ProductDetails product={product} />
    </section>
  );
}
