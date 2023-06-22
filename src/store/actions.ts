// import { AddToCartFormSchema } from '@route/product/[id]/AddToCartForm';

import { CartProduct, Product } from '../../types/Product';
import type { SetStore } from './index';

type AddToCartFormSchema = any;

export type AddToCartAction = {
  data: AddToCartFormSchema;
  product: Product;
  set: SetStore;
};

export const addToCartAction = ({ data, product, set }: AddToCartAction) =>
  set(state => {
    const itemExistsInACart = state.cart.find(item => item.details.id === product.id && item.size === data.size);

    if (itemExistsInACart) {
      const itemsAfterUpdate = state.cart.map(item => {
        if (item.details.id === product.id) {
          return {
            ...item,
            quantity: parseInt(item.quantity as any as string) + parseInt(data.quantity),
          };
        }

        return item;
      });

      localStorage.setItem('cart', JSON.stringify(itemsAfterUpdate));
      return { cart: itemsAfterUpdate };
    }

    const newItem: CartProduct = {
      details: {
        id: product.id,
        name: product.name,
        producer: product.producer,
        price: product.price,
        images: product.images,
      },
      color: data.color,
      size: data.size,
      quantity: parseInt(data.quantity),
    };

    const itemsAfterNewAddition = [...state.cart, newItem];
    localStorage.setItem('cart', JSON.stringify(itemsAfterNewAddition));
    return { cart: itemsAfterNewAddition };
  });
