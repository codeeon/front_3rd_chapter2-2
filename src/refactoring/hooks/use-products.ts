import { useState } from 'react';
import type { ProductType } from '../../types.ts';

export const useProducts = (initialProducts: ProductType[]) => {
  return { products: [], updateProduct: () => undefined, addProduct: () => undefined };
};
