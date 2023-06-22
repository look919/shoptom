import type { DashboardProduct } from '@domainTypes/Product';
import { db } from '@lib/db';
import { Filters } from './Filters';
import { Product } from './Product';

type Props = {
  searchParams: {
    name: string;
    producer: string;
    dimensions: string[];
    minPrice: string;
    maxPrice: string;
    colors: string[];
  };
};

export default async function HomePage({ searchParams }: Props) {
  const products: DashboardProduct[] = await db.product.findMany({
    include: {
      images: true,
      dimensions: true,
    },
    where: {
      name: {
        contains: searchParams.name,
      },
      producer: {
        contains: searchParams.producer,
      },
      dimensions: {
        some: {
          value: {
            in: searchParams.dimensions,
          },
        },
      },
      price: {
        gte: parseInt(searchParams.minPrice) || 0,
        lte: parseInt(searchParams.maxPrice) || 10000,
      },
      colors: {
        some: {
          id: {
            in: searchParams.colors,
          },
        },
      },
    },
  });

  const colors = await db.color.findMany();

  return (
    <main className='flex'>
      <Filters colors={colors} />
      <div className='grid grid-cols-4 gap-8'>
        {products.map(product => (
          <Product product={product} key={product.name} />
        ))}
      </div>
    </main>
  );
}
