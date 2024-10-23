import { useState } from 'react';
import type { ProductType } from '../../../types';

export const useProductList = (initialProductList: ProductType[]) => {
  const [productList, setProductList] = useState<ProductType[]>(initialProductList);

  const updateProduct = (product: ProductType) => {
    setProductList((prevProductList) =>
      prevProductList.map((p) => (p.id === product.id ? product : p))
    );
  };

  const addProduct = (product: ProductType) => {
    setProductList([...productList, product]);
  };

  return { productList: productList, updateProduct, addProduct };
};
