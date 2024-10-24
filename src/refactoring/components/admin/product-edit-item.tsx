import { DiscountType, ProductType } from '../../../types';
import { DiscountForm } from './discount-form';
import { DiscountItem } from './discount-item';

export const ProductEditForm = ({
  product,
  onProductUpdate,
  productList,
  editingProduct,
  setEditingProduct,
  handleProductNameUpdate,
  handlePriceUpdate,
  handleStockUpdate,
  handleEditComplete,
  handleAddDiscount,
  handleRemoveDiscount,
  newDiscount,
  setNewDiscount,
}: {
  product: ProductType;
  onProductUpdate: (updatedProduct: ProductType) => void;
  productList: ProductType[];
  editingProduct: ProductType | null;
  setEditingProduct: (product: ProductType | null) => void;
  handleProductNameUpdate: (productId: string, name: string) => void;
  handlePriceUpdate: (productId: string, price: number) => void;
  handleStockUpdate: (
    productId: string,
    stock: number,
    productList: ProductType[],
    onProductUpdate: (updatedProduct: ProductType) => void
  ) => void;
  handleEditComplete: (
    onProductUpdate: (updatedProduct: ProductType) => void,
    editingProduct: ProductType | null
  ) => void;
  handleRemoveDiscount: (
    productId: string,
    index: number,
    productList: ProductType[],
    onProductUpdate: (product: ProductType) => void
  ) => void;
  handleAddDiscount: (
    productId: string,
    productList: ProductType[],
    onProductUpdate: (product: ProductType) => void
  ) => void;
  newDiscount: DiscountType;
  setNewDiscount: (discount: DiscountType) => void;
}) => {
  return (
    <div>
      <div className='mb-4'>
        <label className='block mb-1'>상품명: </label>
        <input
          type='text'
          value={editingProduct?.name}
          onChange={(e) => handleProductNameUpdate(product.id, e.target.value)}
          className='w-full p-2 border rounded'
        />
      </div>
      <div className='mb-4'>
        <label className='block mb-1'>가격: </label>
        <input
          type='number'
          value={editingProduct?.price}
          onChange={(e) => handlePriceUpdate(product.id, parseInt(e.target.value))}
          className='w-full p-2 border rounded'
        />
      </div>
      <div className='mb-4'>
        <label className='block mb-1'>재고: </label>
        <input
          type='number'
          value={editingProduct?.stock}
          onChange={(e) =>
            handleStockUpdate(product.id, parseInt(e.target.value), productList, onProductUpdate)
          }
          className='w-full p-2 border rounded'
        />
      </div>
      <div>
        <h4 className='text-lg font-semibold mb-2'>할인 정보</h4>
        {editingProduct?.discountList.map((discount, index) => (
          <DiscountItem
            key={index}
            discount={discount}
            index={index}
            productId={product.id}
            setEditingProduct={setEditingProduct}
            productList={productList}
            onProductUpdate={onProductUpdate}
            handleRemoveDiscount={handleRemoveDiscount}
          />
        ))}
        <DiscountForm
          productId={product.id}
          setEditingProduct={setEditingProduct}
          productList={productList}
          onProductUpdate={onProductUpdate}
          editingProduct={editingProduct}
          handleAddDiscount={handleAddDiscount}
          newDiscount={newDiscount}
          setNewDiscount={setNewDiscount}
        />
      </div>
      <button
        onClick={() => handleEditComplete(onProductUpdate, editingProduct)}
        className='bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2'
      >
        수정 완료
      </button>
    </div>
  );
};
