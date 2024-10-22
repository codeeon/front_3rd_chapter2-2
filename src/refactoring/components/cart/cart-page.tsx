import type { CouponType, ProductType } from '../../../types.ts';
import { useCart } from '../../hooks/index.ts';
import { CartItem } from './cart-item.tsx';
import { CartProductItem } from './cart-product-item.tsx';
import { Coupon } from './coupon.tsx';
import { OrderSummary } from './order-summary.tsx';

interface CartPageProps {
  products: ProductType[];
  coupons: CouponType[];
}

export const CartPage = ({ products, coupons }: CartPageProps) => {
  const { cart, calculateTotal, applyCoupon, selectedCoupon } = useCart();

  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } = calculateTotal();

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>장바구니</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <h2 className='text-2xl font-semibold mb-4'>상품 목록</h2>
          <div className='space-y-2'>
            {products.map((product) => (
              <CartProductItem key={product.id} product={product} />
            ))}
          </div>
        </div>
        <div>
          <h2 className='text-2xl font-semibold mb-4'>장바구니 내역</h2>
          <div className='space-y-2'>
            {cart.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>
          <Coupon coupons={coupons} applyCoupon={applyCoupon} selectedCoupon={selectedCoupon} />
          <OrderSummary
            totalBeforeDiscount={totalBeforeDiscount}
            totalAfterDiscount={totalAfterDiscount}
            totalDiscount={totalDiscount}
          />
        </div>
      </div>
    </div>
  );
};
