'use client';

import { useStore } from '@store';
import { Button } from '@ui';
import { getTotalCartPrice } from '@utils/product';
import { createPayment } from './actions';

export const Purchase = () => {
  const { cart } = useStore();
  const total = getTotalCartPrice(cart);

  const handlePayment = async () => {
    const res = await createPayment({ customerId: '42', cartProducts: cart });

    if (res.url) {
      window.location.assign(res.url);
    }
  };

  return (
    <>
      <div className='mt-4 flex justify-end'>
        <span className='mr-2 text-2xl'>Total:</span>
        <span className='text-2xl text-green-600'>{total}€</span>
      </div>

      <Button onClick={handlePayment} className='mt-4 self-end'>
        Purchase
      </Button>
    </>
  );
};
