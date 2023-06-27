'use client';

import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useStore } from '@store';
import { Icons } from '@ui';
import { CartItems } from './CartItems';
import { Purchase } from './Purchase';

type Props = {
  searchParams: { success: boolean; canceled: boolean };
};

export default function CartPage({ searchParams }: Props) {
  const { clearCart } = useStore();

  useEffect(() => {
    if (searchParams.success) {
      toast.success('Payment successful');
      clearCart();
    }

    if (searchParams.canceled) {
      toast.error('Payment canceled');
    }
  }, [searchParams, clearCart]);

  return (
    <main className='flex flex-col border-y border-slate-200 p-6'>
      <div className='mb-8 flex items-center border-b pb-6'>
        <Icons.cart className='mr-4 h-12 w-12' />
        <h2 className='text-4xl'>Cart</h2>
      </div>

      <CartItems />
      <Purchase />
    </main>
  );
}
