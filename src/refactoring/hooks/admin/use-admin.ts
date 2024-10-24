import { useState } from 'react';
import { CouponType, DiscountType, ProductType } from '../../../types';
import { createNewProduct, findProductById } from '../../utils/admin-utils';

const INITIAL_NEW_PRODUCT = {
  name: '',
  price: 0,
  stock: 0,
  discountList: [],
};
const INITIAL_NEW_DISCOUNT = { quantity: 0, rate: 0 };
const INITIAL_NEW_COUPON = {
  name: '',
  code: '',
  discountType: 'percentage' as CouponType['discountType'],
  discountValue: 0,
};

export const useAdmin = () => {
  const [openProductIdList, setOpenProductIdList] = useState<Set<string>>(new Set());
  const [editingProduct, setEditingProduct] = useState<ProductType | null>(null);
  const [newDiscount, setNewDiscount] = useState<DiscountType>(INITIAL_NEW_DISCOUNT);
  const [newCoupon, setNewCoupon] = useState<CouponType>(INITIAL_NEW_COUPON);
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<ProductType, 'id'>>(INITIAL_NEW_PRODUCT);

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

  function handleEditProduct(product: ProductType) {
    setEditingProduct({ ...product });
  }

  function handleProductNameUpdate(productId: string, newName: string) {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, name: newName };
      setEditingProduct(updatedProduct);
    }
  }

  function handlePriceUpdate(productId: string, newPrice: number) {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, price: newPrice };
      setEditingProduct(updatedProduct);
    }
  }

  function handleEditComplete(onProductUpdate: (product: ProductType) => void) {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  }

  function handleStockUpdate(
    productId: string,
    newStock: number,
    productList: ProductType[],
    onProductUpdate: (product: ProductType) => void
  ) {
    const updatedProduct = findProductById(productId, productList);
    if (updatedProduct) {
      const newProduct = { ...updatedProduct, stock: newStock };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  }

  function handleAddDiscount(
    productId: string,
    productList: ProductType[],
    onProductUpdate: (product: ProductType) => void
  ) {
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
  }

  function handleRemoveDiscount(
    productId: string,
    index: number,
    productList: ProductType[],
    onProductUpdate: (product: ProductType) => void
  ) {
    const updatedProduct = findProductById(productId, productList);
    if (updatedProduct) {
      const newProduct = {
        ...updatedProduct,
        discountList: updatedProduct.discountList.filter((_, i) => i !== index),
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  }

  function handleAddCoupon(onCouponAdd: (coupon: CouponType) => void, newCoupon: CouponType) {
    onCouponAdd(newCoupon);
    setNewCoupon(INITIAL_NEW_COUPON);
  }

  function handleAddNewProduct(
    newProduct: Omit<ProductType, 'id'>,
    onProductAdd: (product: ProductType) => void
  ) {
    const productWithId = createNewProduct(newProduct);
    onProductAdd(productWithId);
    setNewProduct(INITIAL_NEW_PRODUCT);
    setShowNewProductForm(false);
  }

  function handleShowNewProductForm() {
    setShowNewProductForm((prevState) => !prevState);
  }

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
