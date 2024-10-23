import { useState } from 'react';
import type { ProductType } from '../../types.ts';

const mockProductList: ProductType[] = [
  {
    id: 'p1',
    name: '상품1',
    price: 10000,
    stock: 20,
    discountList: [
      { quantity: 10, rate: 0.1 },
      { quantity: 20, rate: 0.2 },
    ],
  },
  {
    id: 'p2',
    name: '상품2',
    price: 20000,
    stock: 20,
    discountList: [{ quantity: 10, rate: 0.15 }],
  },
  {
    id: 'p3',
    name: '상품3',
    price: 30000,
    stock: 20,
    discountList: [{ quantity: 10, rate: 0.2 }],
  },
];

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
