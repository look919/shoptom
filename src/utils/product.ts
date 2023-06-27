import { CartProduct } from 'store/addToCartAction';
import { Dimension, Product } from '@prisma/client';
import { removeDuplicates } from './removeDuplicates';
import { sortAlphabetically } from './sortAlphabetically';

export const generateProductPrice = (price: number) => `$${price.toFixed(2)}`;

type GetProductSizesProduct = Product & {
  dimensions: Dimension[];
};

export const getProductSizes = (product: GetProductSizesProduct) =>
  removeDuplicates(product.dimensions.map(dimension => dimension.value)).sort(sortAlphabetically);

export const getTotalCartPrice = (cartProducts: CartProduct[]) =>
  cartProducts.reduce((total, product) => total + product.quantity * product.details.price, 0);
