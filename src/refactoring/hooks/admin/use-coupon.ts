import { useState } from 'react';
import { CouponType } from '../../../types';

const INITIAL_NEW_COUPON = {
  name: '',
  code: '',
  discountType: 'percentage' as CouponType['discountType'],
  discountValue: 0,
};

export const useCoupon = () => {
  const [newCoupon, setNewCoupon] = useState<CouponType>(INITIAL_NEW_COUPON);

  const handleAddCoupon = (onCouponAdd: (coupon: CouponType) => void) => {
    onCouponAdd(newCoupon);
    setNewCoupon(INITIAL_NEW_COUPON);
  };

  return { newCoupon, setNewCoupon, handleAddCoupon };
};
