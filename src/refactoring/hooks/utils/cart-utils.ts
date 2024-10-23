import type { CartItemType, CouponType } from '../../../types';

export const calculateItemTotal = (item: CartItemType) => {
  const { product, quantity } = item;

  const total = product.price * quantity;
  const discount = getMaxApplicableDiscount(item);

  return total * (1 - discount);
};

export const getMaxApplicableDiscount = (item: CartItemType) => {
  const { discounts } = item.product;
  const { quantity } = item;

  let appliedDiscount = 0;

  Object.entries(discounts).forEach(([_, value]) => {
    if (quantity >= value.quantity) {
      appliedDiscount = Math.max(appliedDiscount, value.rate);
    }
  });

  return appliedDiscount;
};

export const calculateTotalBeforeDiscount = (cart: CartItemType[]) =>
  cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

export const calculateCartTotal = (cart: CartItemType[], selectedCoupon: CouponType | null) => {
  const totalBeforeDiscount = calculateTotalBeforeDiscount(cart);

  let totalAfterDiscount = cart.reduce((acc, item) => acc + calculateItemTotal(item), 0);

  if (selectedCoupon) {
    switch (selectedCoupon?.discountType) {
      case 'amount':
        totalAfterDiscount -= selectedCoupon.discountValue;
        break;
      case 'percentage':
        totalAfterDiscount *= 1 - selectedCoupon.discountValue / 100;
        break;
    }
  }

  const totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount,
  };
};

export const updateCartItemQuantity = (
  cart: CartItemType[],
  productId: string,
  newQuantity: number
): CartItemType[] => {
  if (newQuantity <= 0) {
    return cart.filter((item) => item.product.id !== productId);
  }

  return [
    {
      product: cart.find((item) => item.product.id === productId)!.product,
      quantity: Math.min(
        newQuantity,
        cart.find((item) => item.product.id === productId)!.product.stock
      ),
    },
    ...cart.filter((item) => item.product.id !== productId),
  ];
};
