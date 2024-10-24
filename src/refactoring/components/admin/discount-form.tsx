import { useState } from 'react';
import { ProductType, DiscountType } from '../../../types';

export const DiscountForm = ({
  productId,
  setEditingProduct,
  productList,
  onProductUpdate,
  editingProduct,
}: {
  productId: string;
  setEditingProduct: (product: ProductType) => void;
  productList: ProductType[];
  onProductUpdate: (product: ProductType) => void;
  editingProduct: ProductType | null;
}) => {
  const [newDiscount, setNewDiscount] = useState<DiscountType>({ quantity: 0, rate: 0 });

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

  return (
    <div className='flex space-x-2'>
      <input
        type='number'
        placeholder='수량'
        value={newDiscount.quantity}
        onChange={(e) =>
          setNewDiscount({
            ...newDiscount,
            quantity: parseInt(e.target.value),
          })
        }
        className='w-1/3 p-2 border rounded'
      />
      <input
        type='number'
        placeholder='할인율 (%)'
        value={newDiscount.rate * 100}
        onChange={(e) =>
          setNewDiscount({
            ...newDiscount,
            rate: parseInt(e.target.value) / 100,
          })
        }
        className='w-1/3 p-2 border rounded'
      />
      <button
        onClick={() => handleAddDiscount(productId, productList, onProductUpdate)}
        className='w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
      >
        할인 추가
      </button>
    </div>
  );
};
