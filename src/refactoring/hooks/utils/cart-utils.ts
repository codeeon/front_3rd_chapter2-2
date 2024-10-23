import type { CartItemType, CouponType } from '../../../types';

// params만 맞으면, 범용적으로 사용 가능한 계산식
// export 함수들은 모두 외부에서도 사용 중.
// export가 없는 함수들은, cart-utils 내부에서만 사용되는 함수들.
export const selectedCartItem = (cart: CartItemType[], productId: string) => {
  return cart.find((item) => item.product.id === productId);
};

export const getMaxApplicableDiscount = (item: CartItemType) => {
  const { discountList } = item.product;
  const { quantity } = item;

  let appliedDiscount = 0;

  Object.entries(discountList).forEach(([_, value]) => {
    if (quantity >= value.quantity) {
      appliedDiscount = Math.max(appliedDiscount, value.rate);
    }
  });

  return appliedDiscount;
};

export const calculateItemTotal = (item: CartItemType) => {
  const { product, quantity } = item;

  const total = product.price * quantity;
  const discount = getMaxApplicableDiscount(item);

  return total * (1 - discount);
};

const calculateTotalBeforeDiscount = (cart: CartItemType[]) =>
  cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

const calculateCartTotalAfterDiscount = (
  cart: CartItemType[],
  selectedCoupon?: CouponType | null
) => {
  let totalItemAmount = cart.reduce((acc, item) => acc + calculateItemTotal(item), 0);

  if (selectedCoupon) {
    switch (selectedCoupon?.discountType) {
      case 'amount':
        totalItemAmount -= selectedCoupon.discountValue;
        break;
      case 'percentage':
        totalItemAmount *= 1 - selectedCoupon.discountValue / 100;
        break;
    }
  }

  return totalItemAmount;
};

export const calculateCartTotal = (cart: CartItemType[], selectedCoupon: CouponType | null) => {
  const totalBeforeDiscount = calculateTotalBeforeDiscount(cart);
  const totalAfterDiscount = calculateCartTotalAfterDiscount(cart, selectedCoupon);
  const totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount,
  };
};

export const removeCartItem = (cart: CartItemType[], productId: string) => {
  return cart.filter((item) => item.product.id !== productId);
};

export const updateCartItemQuantity = (
  cart: CartItemType[],
  productId: string,
  newQuantity: number
): CartItemType[] => {
  if (newQuantity <= 0) {
    return removeCartItem(cart, productId);
  }

  return [
    {
      product: selectedCartItem(cart, productId)!.product,
      quantity: Math.min(newQuantity, selectedCartItem(cart, productId)!.product.stock),
    },
    ...cart.filter((item) => item.product.id !== productId),
  ];
};
