'use client';

import { useStore } from '@store';
import { CartItem } from '@ui';

export function CartItems() {
  const { cart } = useStore();

  return (
    <>
      {cart.map((cartItem, i) => (
        <CartItem key={`cartItem.details.id${i}`} product={cartItem} />
      ))}
    </>
  );
}
