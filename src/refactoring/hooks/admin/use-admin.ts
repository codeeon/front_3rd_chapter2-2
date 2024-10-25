import { useProductAccordion } from './use-product-accordion';
import { useProductEdit } from './use-product-edit';
import { useDiscount } from './use-discount';
import { useCoupon } from './use-coupon';
import { useNewProductForm } from './use-new-product-form';

export const useAdmin = () => {
  const { openProductIdList, toggleProductAccordion } = useProductAccordion();
  const {
    editingProduct,
    setEditingProduct,
    handleEditProduct,
    handleProductNameUpdate,
    handlePriceUpdate,
    handleEditComplete,
    handleStockUpdate,
  } = useProductEdit();
  const { newDiscount, setNewDiscount, handleAddDiscount, handleRemoveDiscount } = useDiscount();
  const { newCoupon, setNewCoupon, handleAddCoupon } = useCoupon();
  const {
    showNewProductForm,
    newProduct,
    setNewProduct,
    handleAddNewProduct,
    handleShowNewProductForm,
    setShowNewProductForm,
  } = useNewProductForm();

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
