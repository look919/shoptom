import { DashboardProduct } from '../../types/Product';
import { removeDuplicates } from './removeDuplicates';
import { sortAlphabetically } from './sortAlphabetically';

export const generateProductPrice = (price: number) => `$${price.toFixed(2)}`;

export const getProductSizes = (product: DashboardProduct) =>
  removeDuplicates(product.dimensions.map(dimension => dimension.value)).sort(sortAlphabetically);
