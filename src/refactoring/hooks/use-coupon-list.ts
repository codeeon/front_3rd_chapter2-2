import type { CouponType } from '../../types';
import { useState } from 'react';

const mockCouponList: CouponType[] = [
  {
    name: '5000원 할인 쿠폰',
    code: 'AMOUNT5000',
    discountType: 'amount',
    discountValue: 5000,
  },
  {
    name: '10% 할인 쿠폰',
    code: 'PERCENT10',
    discountType: 'percentage',
    discountValue: 10,
  },
];

export const useCouponList = (initialCouponList: CouponType[]) => {
  const [couponList, setCouponList] = useState<CouponType[]>(initialCouponList ?? mockCouponList);

  const addCoupon = (coupon: CouponType) => {
    setCouponList([...couponList, coupon]);
  };

  return { couponList, addCoupon };
};
