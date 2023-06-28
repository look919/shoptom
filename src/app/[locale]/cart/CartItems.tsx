'use client';

import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useStore } from '@store';
import { CartItem, Icons } from '@ui';

type Props = {
  searchParams: { success: boolean; canceled: boolean };
};

const useCartStatus = (searchParams: Props['searchParams']) => {
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

  return searchParams.success ? 'Thank you for purchasing in our store!' : 'Your cart is empty';
};

export function CartItems({ searchParams }: Props) {
  const { cart } = useStore();
  const cartStatus = useCartStatus(searchParams);

  if (!cart.length) {
    return (
      <div className='flex flex-col items-center justify-center'>
        <Icons.emptyCart className='h-24 w-24 text-slate-300' />
        <h2 className='text-2xl text-slate-300'>{cartStatus}</h2>
      </div>
    );
  }

  return (
    <>
      {cart.map((cartItem, i) => (
        <CartItem key={`cartItem.details.id${i}`} product={cartItem} />
      ))}
    </>
  );
}
