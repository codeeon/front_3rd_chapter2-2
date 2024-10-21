import type { CouponType } from '../../types';
import { useState } from 'react';

export const useCoupons = (initialCoupons: CouponType[]) => {
  return { coupons: [], addCoupon: () => undefined };
};
