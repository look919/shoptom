import { StoreApi, UseBoundStore, create } from 'zustand';
import { AddToCartFormSchema } from '@page/product/[id]/AddToCartForm';
import { AddToCartProductType, CartProduct, addToCartAction, clearCartAction } from './cartActions';

export type Store = {
  cart: CartProduct[];
  addToCart: (product: AddToCartProductType, data: AddToCartFormSchema) => void;
  clearCart: () => void;
};

export type SetStore = (
  partial: Store | Partial<Store> | ((state: Store) => Store | Partial<Store>),
  replace?: boolean | undefined,
) => void;

export const useStore: UseBoundStore<StoreApi<Store>> = create<Store>(set => ({
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
  addToCart: (product: AddToCartProductType, data: AddToCartFormSchema) => addToCartAction({ product, data, set }),
  clearCart: () => clearCartAction(set),
}));
