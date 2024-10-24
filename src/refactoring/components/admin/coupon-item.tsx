import { CouponType } from '../../../types';

export const CouponItem = ({ coupon, index }: { coupon: CouponType; index: number }) => {
  return (
    <div data-testid={`coupon-${index + 1}`} className='bg-gray-100 p-2 rounded'>
      {coupon.name} ({coupon.code}):
      {coupon.discountType === 'amount'
        ? `${coupon.discountValue}원`
        : `${coupon.discountValue}%`}{' '}
      할인
    </div>
  );
};