import { Dispatch, SetStateAction } from 'react';
import { ProductType } from '../../types';

export const findProductById = (
  productId: string,
  productList: ProductType[]
): ProductType | undefined => {
  return productList.find((p) => p.id === productId);
};

export const createNewProduct = (newProduct: Omit<ProductType, 'id'>): ProductType => {
  return { ...newProduct, id: Date.now().toString() };
};

export const calculateDiscountRate = (rate: number): number => rate * 100;

export const updateState = <T>(
  setState: Dispatch<SetStateAction<T | null>>,
  key: keyof NonNullable<T>,
  value: NonNullable<T>[keyof NonNullable<T>]
) => {
  setState((prev) => {
    if (prev === null) return prev;
    return { ...prev, [key]: value };
  });
};
