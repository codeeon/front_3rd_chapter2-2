// useCart.ts
import { useState } from 'react';
import type { CartItemType, CouponType, ProductType } from '../../../types';
import {
  calculateCartTotal,
  removeCartItem,
  selectedCartItem,
  updateCartItemQuantity,
} from '../../utils/cart-utils';

export const useCart = () => {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<CouponType | null>(null);

  // cart에 의존하는 계산 로직 - useCart에서의 const로 선언된 함수들.
  const getRemainingStock = (product: ProductType) => {
    const cartItem = selectedCartItem(cart, product.id);
    return product.stock - (cartItem?.quantity || 0);
  };

  const addNewCartItem = (product: ProductType) => {
    const existingItem = selectedCartItem(cart, product.id);
    if (existingItem) {
      return updateCartItemQuantity(cart, product.id, existingItem.quantity + 1);
    } else {
      return [...cart, { product, quantity: 1 }];
    }
  };

  const calculateTotal = () => {
    const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } = calculateCartTotal(
      cart,
      selectedCoupon
    );

    return {
      totalBeforeDiscount,
      totalAfterDiscount,
      totalDiscount,
    };
  };

  // 액션 함수(렌더링 조건에 따라 상태를 변경하는 함수들) - useCart에서의 function으로 선언된 함수들.
  function addToCart(product: ProductType) {
    const remainingStock = getRemainingStock(product);
    if (remainingStock <= 0) return;

    const cartWithNewItem = addNewCartItem(product);

    setCart(cartWithNewItem);
  }

  function removeFromCart(productId: string) {
    const cartWithoutItem = removeCartItem(cart, productId);

    setCart(cartWithoutItem);
  }

  function updateQuantity(productId: string, newQuantity: number) {
    setCart((prevCart) => updateCartItemQuantity(prevCart, productId, newQuantity));
  }

  function applyCoupon(coupon: CouponType) {
    setSelectedCoupon(coupon);
  }

  return {
    cart,
    addToCart,
    getRemainingStock,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  };
};
