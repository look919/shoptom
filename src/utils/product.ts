import { Dimension, Product } from '@prisma/client';
import { removeDuplicates } from './removeDuplicates';
import { sortAlphabetically } from './sortAlphabetically';

export const generateProductPrice = (price: number) => `$${price.toFixed(2)}`;

type GetProductSizesProduct = Product & {
  dimensions: Dimension[];
};

export const getProductSizes = (product: GetProductSizesProduct) =>
  removeDuplicates(product.dimensions.map(dimension => dimension.value)).sort(sortAlphabetically);
