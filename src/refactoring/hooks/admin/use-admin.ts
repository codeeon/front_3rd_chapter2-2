import { useState } from 'react';
import { CouponType, DiscountType, ProductType } from '../../../types';

export const useAdmin = () => {
  const [openProductIdList, setOpenProductIdList] = useState<Set<string>>(new Set());
  const [editingProduct, setEditingProduct] = useState<ProductType | null>(null);
  const [newDiscount, setNewDiscount] = useState<DiscountType>({ quantity: 0, rate: 0 });
  const [newCoupon, setNewCoupon] = useState<CouponType>({
    name: '',
    code: '',
    discountType: 'percentage',
    discountValue: 0,
  });
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<ProductType, 'id'>>({
    name: '',
    price: 0,
    stock: 0,
    discountList: [],
  });

  const toggleProductAccordion = (productId: string) => {
    setOpenProductIdList((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const handleEditProduct = (product: ProductType) => {
    setEditingProduct({ ...product });
  };

  const handleProductNameUpdate = (productId: string, newName: string) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, name: newName };
      setEditingProduct(updatedProduct);
    }
  };

  // 새로운 핸들러 함수 추가
  const handlePriceUpdate = (productId: string, newPrice: number) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, price: newPrice };
      setEditingProduct(updatedProduct);
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
    const updatedProduct = productList.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = { ...updatedProduct, stock: newStock };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  const handleAddDiscount = (
    productId: string,
    productList: ProductType[],
    onProductUpdate: (product: ProductType) => void
  ) => {
    const updatedProduct = productList.find((p) => p.id === productId);
    if (updatedProduct && editingProduct) {
      const newProduct = {
        ...updatedProduct,
        discountList: [...updatedProduct.discountList, newDiscount],
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
      setNewDiscount({ quantity: 0, rate: 0 });
    }
  };

  const handleRemoveDiscount = (
    productId: string,
    index: number,
    productList: ProductType[],
    onProductUpdate: (product: ProductType) => void
  ) => {
    const updatedProduct = productList.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = {
        ...updatedProduct,
        discountList: updatedProduct.discountList.filter((_, i) => i !== index),
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  const handleAddCoupon = (onCouponAdd: (coupon: CouponType) => void, newCoupon: CouponType) => {
    onCouponAdd(newCoupon);
    setNewCoupon({
      name: '',
      code: '',
      discountType: 'percentage',
      discountValue: 0,
    });
  };

  const handleAddNewProduct = (
    newProduct: Omit<ProductType, 'id'>,
    onProductAdd: (product: ProductType) => void
  ) => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    onProductAdd(productWithId);
    setNewProduct({
      name: '',
      price: 0,
      stock: 0,
      discountList: [],
    });
    setShowNewProductForm(false);
  };

  const handleShowNewProductForm = () => {
    setShowNewProductForm((prevState) => !prevState);
  };

  return {
    openProductIdList,
    editingProduct,
    newDiscount,
    newCoupon,
    showNewProductForm,
    newProduct,
    toggleProductAccordion,
    handleEditProduct,
    handleProductNameUpdate,
    handlePriceUpdate,
    handleEditComplete,
    handleStockUpdate,
    handleAddDiscount,
    handleRemoveDiscount,
    handleAddCoupon,
    handleAddNewProduct,
    handleShowNewProductForm,
    setShowNewProductForm,
    setNewDiscount,
    setNewCoupon,
    setNewProduct,
    setEditingProduct,
  };
};
