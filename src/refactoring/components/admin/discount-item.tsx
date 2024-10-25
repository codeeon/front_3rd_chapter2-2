import { DiscountType, ProductType } from '../../../types';
import { calculateDiscountRate } from '../../utils/admin-utils';

interface DiscountItemPropsType {
  discount: DiscountType;
  index: number;
  productId: string;
  productList: ProductType[];
  onProductUpdate: (product: ProductType) => void;
  handleRemoveDiscount: (
    productId: string,
    index: number,
    productList: ProductType[],
    onProductUpdate: (product: ProductType) => void,
    setEditingProduct: (product: ProductType | null) => void
  ) => void;
  setEditingProduct: (product: ProductType | null) => void;
}

export const DiscountItem = (props: DiscountItemPropsType) => {
  const {
    discount,
    index,
    productId,
    productList,
    onProductUpdate,
    handleRemoveDiscount,
    setEditingProduct,
  } = props;

  return (
    <div key={index} className='flex justify-between items-center mb-2'>
      <span>
        {discount.quantity}개 이상 구매 시 {calculateDiscountRate(discount.rate)}% 할인
      </span>
      <button
        onClick={() =>
          handleRemoveDiscount(productId, index, productList, onProductUpdate, setEditingProduct)
        }
        className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600'
      >
        삭제
      </button>
    </div>
  );
};
