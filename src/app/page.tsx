import type { DashboardProduct } from '@domainTypes/Product';
import { db } from '@lib/db';
import { Product } from './Product';

export default async function HomePage() {
  const products: DashboardProduct[] = await db.product.findMany({
    include: {
      images: true,
      dimensions: true,
    },
  });

  return (
    <main className='flex'>
      <aside className='w-full max-w-sm'>Tomo</aside>
      <div className='grid grid-cols-4 gap-8'>
        {products.map(product => (
          <Product product={product} key={product.name} />
        ))}
      </div>
    </main>
  );
}
