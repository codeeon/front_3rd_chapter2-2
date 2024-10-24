import { DiscountType, ProductType } from '../../../types';
import { ProductEditForm } from './product-edit-item';

export const AdminProductItem = ({
  product,
  index,
  onProductUpdate,
  productList,
  handleEditProduct,
  toggleProductAccordion,
  handleProductNameUpdate,
  handlePriceUpdate,
  handleStockUpdate,
  handleEditComplete,
  handleRemoveDiscount,
  handleAddDiscount,
  newDiscount,
  setNewDiscount,
  openProductIdList,
  editingProduct,
  setEditingProduct,
}: {
  product: ProductType;
  index: number;
  onProductUpdate: (updatedProduct: ProductType) => void;
  productList: ProductType[];
  handleEditProduct: (product: ProductType) => void;
  toggleProductAccordion: (productId: string) => void;
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
  openProductIdList: Set<string>;
  editingProduct: ProductType | null;
  setEditingProduct: (product: ProductType | null) => void;
}) => {
  return (
    <div
      key={product.id}
      data-testid={`product-${index + 1}`}
      className='bg-white p-4 rounded shadow'
    >
      <button
        data-testid='toggle-button'
        onClick={() => toggleProductAccordion(product.id)}
        className='w-full text-left font-semibold'
      >
        {product.name} - {product.price}원 (재고: {product.stock})
      </button>
      {openProductIdList.has(product.id) && (
        <div className='mt-2'>
          {editingProduct && editingProduct.id === product.id ? (
            <ProductEditForm
              product={product}
              onProductUpdate={onProductUpdate}
              productList={productList}
              editingProduct={editingProduct}
              setEditingProduct={setEditingProduct}
              handleProductNameUpdate={handleProductNameUpdate}
              handlePriceUpdate={handlePriceUpdate}
              handleStockUpdate={handleStockUpdate}
              handleEditComplete={handleEditComplete}
              handleRemoveDiscount={handleRemoveDiscount}
              handleAddDiscount={handleAddDiscount}
              newDiscount={newDiscount}
              setNewDiscount={setNewDiscount}
            />
          ) : (
            <div>
              {product.discountList.map((discount, index) => (
                <div key={index} className='mb-2'>
                  <span>
                    {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
                  </span>
                </div>
              ))}
              <button
                data-testid='modify-button'
                onClick={() => handleEditProduct(product)}
                className='bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2'
              >
                수정
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
