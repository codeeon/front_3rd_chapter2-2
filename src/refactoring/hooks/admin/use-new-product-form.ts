import { useState } from 'react';
import { ProductType } from '../../../types';
import { createNewProduct } from '../../utils/admin-utils';

const INITIAL_NEW_PRODUCT = {
  name: '',
  price: 0,
  stock: 0,
  discountList: [],
};

export const useNewProductForm = () => {
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<ProductType, 'id'>>(INITIAL_NEW_PRODUCT);

  const handleAddNewProduct = (onProductAdd: (product: ProductType) => void) => {
    const productWithId = createNewProduct(newProduct);
    onProductAdd(productWithId);
    setNewProduct(INITIAL_NEW_PRODUCT);
    setShowNewProductForm(false);
  };

  const handleShowNewProductForm = () => {
    setShowNewProductForm((prevState) => !prevState);
  };

  return {
    showNewProductForm,
    newProduct,
    setNewProduct,
    handleAddNewProduct,
    handleShowNewProductForm,
    setShowNewProductForm,
  };
};
