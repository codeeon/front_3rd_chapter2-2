import { DiscountType, ProductType } from '../../../types';

interface DiscountFormPropsType {
  productId: string;
  productList: ProductType[];
  onProductUpdate: (product: ProductType) => void;
  handleAddDiscount: (
    productId: string,
    productList: ProductType[],
    onProductUpdate: (product: ProductType) => void,
    editingProduct: ProductType | null,
    setEditingProduct: (product: ProductType | null) => void
  ) => void;
  newDiscount: DiscountType;
  setNewDiscount: (discount: DiscountType) => void;
  editingProduct: ProductType | null;
  setEditingProduct: (product: ProductType | null) => void;
}

export const DiscountForm = (props: DiscountFormPropsType) => {
  const {
    productId,
    productList,
    onProductUpdate,
    handleAddDiscount,
    newDiscount,
    setNewDiscount,
    editingProduct,
    setEditingProduct,
  } = props;

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
        onClick={() => handleAddDiscount(productId, productList, onProductUpdate, editingProduct, setEditingProduct)}
        className='w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
      >
        할인 추가
      </button>
    </div>
  );
};
