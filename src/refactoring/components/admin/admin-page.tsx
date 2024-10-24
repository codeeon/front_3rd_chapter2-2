import type { CouponType, ProductType } from '../../../types.ts';
import { useAdmin } from '../../hooks/admin';
import { AdminProductItem } from './admin-product-item.tsx';
import { CouponItem } from './coupon-item.tsx';
import { NewCouponForm } from './new-coupon-form.tsx';
import { NewProductForm } from './new-product-form.tsx';

interface AdminPageProps {
  productList: ProductType[];
  couponList: CouponType[];
  onProductUpdate: (updatedProduct: ProductType) => void;
  onProductAdd: (newProduct: ProductType) => void;
  onCouponAdd: (newCoupon: CouponType) => void;
}

export const AdminPage = ({
  productList,
  couponList,
  onProductUpdate,
  onProductAdd,
  onCouponAdd,
}: AdminPageProps) => {
  const {
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
    setNewDiscount,
    setNewCoupon,
    setNewProduct,
    setEditingProduct,
  } = useAdmin();

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>관리자 페이지</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <h2 className='text-2xl font-semibold mb-4'>상품 관리</h2>
          <button
            onClick={handleShowNewProductForm}
            className='bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600'
          >
            {showNewProductForm ? '취소' : '새 상품 추가'}
          </button>
          {showNewProductForm && (
            <NewProductForm
              onProductAdd={onProductAdd}
              handleAddNewProduct={handleAddNewProduct}
              newProduct={newProduct}
              setNewProduct={setNewProduct}
            />
          )}
          <div className='space-y-2'>
            {productList.map((product, index) => (
              <AdminProductItem
                key={product.id}
                product={product}
                index={index}
                onProductUpdate={onProductUpdate}
                productList={productList}
                handleEditProduct={handleEditProduct}
                toggleProductAccordion={toggleProductAccordion}
                handleProductNameUpdate={handleProductNameUpdate}
                handlePriceUpdate={handlePriceUpdate}
                handleStockUpdate={handleStockUpdate}
                handleEditComplete={handleEditComplete}
                handleRemoveDiscount={handleRemoveDiscount}
                handleAddDiscount={handleAddDiscount}
                newDiscount={newDiscount}
                setNewDiscount={setNewDiscount}
                setEditingProduct={setEditingProduct}
                openProductIdList={openProductIdList}
                editingProduct={editingProduct}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className='text-2xl font-semibold mb-4'>쿠폰 관리</h2>
          <div className='bg-white p-4 rounded shadow'>
            <NewCouponForm
              onCouponAdd={onCouponAdd}
              newCoupon={newCoupon}
              setNewCoupon={setNewCoupon}
              handleAddCoupon={handleAddCoupon}
            />
            <div>
              <h3 className='text-lg font-semibold mb-2'>현재 쿠폰 목록</h3>
              <div className='space-y-2'>
                {couponList.map((coupon, index) => (
                  <CouponItem key={index} coupon={coupon} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
