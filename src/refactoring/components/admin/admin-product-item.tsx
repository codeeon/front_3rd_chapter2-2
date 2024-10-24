import { useState } from 'react';
import { ProductType } from '../../../types';
import { useAdmin } from '../../hooks/admin';
import { ProductEditForm } from './product-edit-item';

export const AdminProductItem = ({
  product,
  index,
  onProductUpdate,
  productList,
}: {
  product: ProductType;
  index: number;
  onProductUpdate: (updatedProduct: ProductType) => void;
  productList: ProductType[];
}) => {
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());
  const [editingProduct, setEditingProduct] = useState<ProductType | null>(null);

  const handleEditProduct = (product: ProductType) => {
    setEditingProduct({ ...product });
  };

  const toggleProductAccordion = (productId: string) => {
    setOpenProductIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

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
      {openProductIds.has(product.id) && (
        <div className='mt-2'>
          {editingProduct && editingProduct.id === product.id ? (
            <ProductEditForm
              product={product}
              onProductUpdate={onProductUpdate}
              productList={productList}
              editingProduct={editingProduct}
              setEditingProduct={setEditingProduct}
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
