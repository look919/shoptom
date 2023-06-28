import { db } from '@lib/db';
import { DashboardProduct } from './components/DashboardProduct';
import { Filters } from './components/Filters/Filters';

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
  const products = await db.product.findMany({
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
      <div className='grid w-full grid-cols-4 justify-items-center gap-8 px-4'>
        {products.map(product => (
          <DashboardProduct product={product} key={product.name} />
        ))}
      </div>
    </main>
  );
}
