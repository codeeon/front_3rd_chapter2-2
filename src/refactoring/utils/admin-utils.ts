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
