import { CouponType } from '../../../types';

interface NewCouponFormPropsType {
  onCouponAdd: (newCoupon: CouponType) => void;
  newCoupon: CouponType;
  setNewCoupon: (coupon: CouponType) => void;
  handleAddCoupon: (onCouponAdd: (coupon: CouponType) => void, newCoupon: CouponType) => void;
}

export const NewCouponForm = (props: NewCouponFormPropsType) => {
  const { onCouponAdd, newCoupon, setNewCoupon, handleAddCoupon } = props;

  return (
    <div className='space-y-2 mb-4'>
      <input
        type='text'
        placeholder='쿠폰 이름'
        value={newCoupon.name}
        onChange={(e) => setNewCoupon({ ...newCoupon, name: e.target.value })}
        className='w-full p-2 border rounded'
      />
      <input
        type='text'
        placeholder='쿠폰 코드'
        value={newCoupon.code}
        onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
        className='w-full p-2 border rounded'
      />
      <div className='flex gap-2'>
        <select
          value={newCoupon.discountType}
          onChange={(e) =>
            setNewCoupon({
              ...newCoupon,
              discountType: e.target.value as 'amount' | 'percentage',
            })
          }
          className='w-full p-2 border rounded'
        >
          <option value='amount'>금액(원)</option>
          <option value='percentage'>할인율(%)</option>
        </select>
        <input
          type='number'
          placeholder='할인 값'
          value={newCoupon.discountValue}
          onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: parseInt(e.target.value) })}
          className='w-full p-2 border rounded'
        />
      </div>
      <button
        onClick={() => handleAddCoupon(onCouponAdd, newCoupon)}
        className='w-full bg-green-500 text-white p-2 rounded hover:bg-green-600'
      >
        쿠폰 추가
      </button>
    </div>
  );
};
