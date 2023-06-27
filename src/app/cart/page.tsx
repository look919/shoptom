import { Icons } from '@ui';
import { CartItems } from './CartItems';
import { Purchase } from './Purchase';

export default function CartPage() {
  return (
    <main className='flex flex-col border-y border-slate-200 p-6'>
      <div className='mb-8 flex items-center border-b pb-6'>
        <Icons.cart className='mr-4 h-12 w-12' />
        <h2 className='text-4xl'>Cart</h2>
      </div>

      <CartItems />
      <Purchase />
    </main>
  );
}
