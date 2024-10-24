import { ProductType } from '../../../types';
import { DiscountForm } from './discount-form';
import { DiscountItem } from './discount-item';

export const ProductEditForm = ({
  product,
  onProductUpdate,
  productList,
  editingProduct,
  setEditingProduct,
}: {
  product: ProductType;
  onProductUpdate: (updatedProduct: ProductType) => void;
  productList: ProductType[];
  editingProduct: ProductType | null;
  setEditingProduct: (product: ProductType | null) => void;
}) => {
  const handleProductNameUpdate = (productId: string, newName: string) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, name: newName };
      setEditingProduct(updatedProduct);
    }
  };

  const handlePriceUpdate = (productId: string, newPrice: number) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, price: newPrice };
      setEditingProduct(updatedProduct);
    }
  };

  const handleEditComplete = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  const handleStockUpdate = (productId: string, newStock: number) => {
    const updatedProduct = productList.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = { ...updatedProduct, stock: newStock };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

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
          onChange={(e) => handleStockUpdate(product.id, parseInt(e.target.value))}
          className='w-full p-2 border rounded'
        />
      </div>
      {/* 할인 정보 수정 부분 */}
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
          />
        ))}
        <DiscountForm
          productId={product.id}
          setEditingProduct={setEditingProduct}
          productList={productList}
          onProductUpdate={onProductUpdate}
          editingProduct={editingProduct}
        />
      </div>
      <button
        onClick={handleEditComplete}
        className='bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2'
      >
        수정 완료
      </button>
    </div>
  );
};
