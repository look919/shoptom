import { StoreApi, UseBoundStore, create } from 'zustand';
// import { AddToCartFormSchema } from '@page/product/[id]/AddToCartForm';
import { CartProduct, Product } from '../types/Product';
import { addToCartAction } from './actions';

type AddToCartFormSchema = {};

export type Store = {
  cart: CartProduct[];
  addToCart: (product: Product, data: AddToCartFormSchema) => void;
};

export type SetStore = (
  partial: Store | Partial<Store> | ((state: Store) => Store | Partial<Store>),
  replace?: boolean | undefined,
) => void;

export const useStore: UseBoundStore<StoreApi<Store>> = create<Store>(set => ({
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
  addToCart: (product: Product, data: AddToCartFormSchema) => addToCartAction({ product, data, set }),
}));
