import { useState } from 'react';
import { DiscountType, ProductType } from '../../../types';
import { findProductById } from '../../utils/admin-utils';

const INITIAL_NEW_DISCOUNT = { quantity: 0, rate: 0 };

export const useDiscount = () => {
  const [newDiscount, setNewDiscount] = useState<DiscountType>(INITIAL_NEW_DISCOUNT);

  const handleAddDiscount = (
    productId: string,
    productList: ProductType[],
    onProductUpdate: (product: ProductType) => void,
    editingProduct: ProductType | null,
    setEditingProduct: (product: ProductType | null) => void
  ) => {
    const updatedProduct = findProductById(productId, productList);
    if (updatedProduct && editingProduct) {
      const newProduct = {
        ...updatedProduct,
        discountList: [...updatedProduct.discountList, newDiscount],
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
      setNewDiscount(INITIAL_NEW_DISCOUNT);
    }
  };

  const handleRemoveDiscount = (
    productId: string,
    index: number,
    productList: ProductType[],
    onProductUpdate: (product: ProductType) => void,
    setEditingProduct: (product: ProductType | null) => void
  ) => {
    const updatedProduct = findProductById(productId, productList);
    if (updatedProduct) {
      const newProduct = {
        ...updatedProduct,
        discountList: updatedProduct.discountList.filter((_, i) => i !== index),
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  return { newDiscount, setNewDiscount, handleAddDiscount, handleRemoveDiscount };
};
