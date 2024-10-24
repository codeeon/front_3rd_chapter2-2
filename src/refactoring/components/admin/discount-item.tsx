import { DiscountType, ProductType } from '../../../types';

export const DiscountItem = ({
  discount,
  index,
  productId,
  setEditingProduct,
  productList,
  onProductUpdate,
}: {
  discount: DiscountType;
  index: number;
  productId: string;
  setEditingProduct: (product: ProductType) => void;
  productList: ProductType[];
  onProductUpdate: (product: ProductType) => void;
}) => {
  const handleRemoveDiscount = (
    productId: string,
    index: number,
    productList: ProductType[],
    onProductUpdate: (product: ProductType) => void
  ) => {
    const updatedProduct = productList.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = {
        ...updatedProduct,
        discountList: updatedProduct.discountList.filter((_, i) => i !== index),
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  return (
    <div key={index} className='flex justify-between items-center mb-2'>
      <span>
        {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
      </span>
      <button
        onClick={() => handleRemoveDiscount(productId, index, productList, onProductUpdate)}
        className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600'
      >
        삭제
      </button>
    </div>
  );
};
