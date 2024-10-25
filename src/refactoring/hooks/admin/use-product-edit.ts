import { useState } from 'react';
import { ProductType } from '../../../types';
import { findProductById } from '../../utils/admin-utils';

export const useProductEdit = () => {
  const [editingProduct, setEditingProduct] = useState<ProductType | null>(null);

  const handleEditProduct = (product: ProductType) => {
    setEditingProduct({ ...product });
  };

  const handleProductNameUpdate = (productId: string, newName: string) => {
    if (editingProduct && editingProduct.id === productId) {
      setEditingProduct({ ...editingProduct, name: newName });
    }
  };

  const handlePriceUpdate = (productId: string, newPrice: number) => {
    if (editingProduct && editingProduct.id === productId) {
      setEditingProduct({ ...editingProduct, price: newPrice });
    }
  };

  const handleEditComplete = (onProductUpdate: (product: ProductType) => void) => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  const handleStockUpdate = (
    productId: string,
    newStock: number,
    productList: ProductType[],
    onProductUpdate: (product: ProductType) => void
  ) => {
    const updatedProduct = findProductById(productId, productList);
    if (updatedProduct) {
      const newProduct = { ...updatedProduct, stock: newStock };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  return {
    editingProduct,
    setEditingProduct,
    handleEditProduct,
    handleProductNameUpdate,
    handlePriceUpdate,
    handleEditComplete,
    handleStockUpdate,
  };
};
