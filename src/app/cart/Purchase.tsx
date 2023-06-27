'use client';

import { FormEvent } from 'react';
import { useStore } from '@store';
import { Button } from '@ui';
import { getTotalCartPrice } from '@utils/product';
import { createPayment } from './actions';

export const Purchase = () => {
  const { cart } = useStore();
  const total = getTotalCartPrice(cart);

  const handlePayment = async (e: FormEvent) => {
    e.preventDefault();
    const res = await createPayment({ customerId: '42', cartProducts: cart });

    console.log('res', res);
  };

  return (
    <>
      <div className='mt-4 flex justify-end'>
        <span className='mr-2 text-2xl'>Total:</span>
        <span className='text-2xl text-green-600'>{total}€</span>
      </div>

      <form onSubmit={handlePayment} className='mt-4 self-end'>
        <Button type='submit'>Purchase</Button>
      </form>
    </>
  );
};
