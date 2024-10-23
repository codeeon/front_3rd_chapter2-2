// useCart.ts
import { Dispatch, SetStateAction, useState } from 'react';
import type { CartItemType, CouponType, ProductType } from '../../types';
import { calculateCartTotal, updateCartItemQuantity } from './utils/cart-utils';

export const useCart = () => {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<CouponType | null>(null);

  const getRemainingStock = (product: ProductType) => {
    const cartItem = cart.find((item) => item.product.id === product.id);
    return product.stock - (cartItem?.quantity || 0);
  };

  const updateCartItemQuantity = (productId: string, newQuantity: number) => {
    return cart.map((item) => {
      if (item.product.id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
  };

  const addNewCartItem = (product: ProductType) => {
    const existingItem = cart.find((item) => item.product.id === product.id);
    if (existingItem) {
      return updateCartItemQuantity(product.id, existingItem.quantity + 1);
    } else {
      return [...cart, { product, quantity: 1 }];
    }
  };

  const removeCartItem = (productId: string) => {
    return cart.filter((item) => item.product.id !== productId);
  };

  function addToCart(product: ProductType) {
    const remainingStock = getRemainingStock(product);
    if (remainingStock <= 0) return;

    const cartWithNewItem = addNewCartItem(product);

    setCart(cartWithNewItem);
  }

  function removeFromCart(productId: string) {
    const cartWithoutItem = removeCartItem(productId);

    setCart(cartWithoutItem);
  }

  function updateQuantity(productId: string, newQuantity: number) {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const maxQuantity = item.product.stock;
            const updatedQuantity = Math.max(0, Math.min(newQuantity, maxQuantity));
            return updatedQuantity > 0 ? { ...item, quantity: updatedQuantity } : null;
          }
          return item;
        })
        .filter((item) => item !== null)
    );
  }

  const applyCoupon = (coupon: CouponType) => {
    setSelectedCoupon(coupon);
  };

  const calculateTotal = () => {
    let totalBeforeDiscount = 0;
    let totalAfterDiscount = 0;

    cart.forEach((item) => {
      const { price } = item.product;
      const { quantity } = item;
      totalBeforeDiscount += price * quantity;

      const discount = item.product.discounts.reduce((maxDiscount, d) => {
        return quantity >= d.quantity && d.rate > maxDiscount ? d.rate : maxDiscount;
      }, 0);

      totalAfterDiscount += price * quantity * (1 - discount);
    });

    let totalDiscount = totalBeforeDiscount - totalAfterDiscount;

    if (selectedCoupon) {
      if (selectedCoupon.discountType === 'amount') {
        totalAfterDiscount = Math.max(0, totalAfterDiscount - selectedCoupon.discountValue);
      } else {
        totalAfterDiscount *= 1 - selectedCoupon.discountValue / 100;
      }
      totalDiscount = totalBeforeDiscount - totalAfterDiscount;
    }

    return {
      totalBeforeDiscount: Math.round(totalBeforeDiscount),
      totalAfterDiscount: Math.round(totalAfterDiscount),
      totalDiscount: Math.round(totalDiscount),
    };
  };

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
