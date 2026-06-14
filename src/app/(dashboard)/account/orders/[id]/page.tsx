import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/common/shared/page-header';
import { Shell } from '@/components/shells/shell';
import { Metadata } from 'next';
import OrderDetails from '../components/OrderDetails';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Order Details',
  description: 'View order details',
};

const OrderDetailsPage = () => {
  return (
    <Shell variant={'sidebar'}>
      <PageHeader id='order-details-header' aria-labelledby='order-details-header-heading' className="flex flex-col items-start gap-y-2 border-b-0 pb-0">
        <Link 
          href="/account/orders" 
          className="flex items-center text-xs font-bold text-slate-500 hover:text-primary transition-colors gap-1.5 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
          Back to Orders
        </Link>
        <div className="flex flex-col gap-0.5">
          <PageHeaderHeading size='sm'>Order Details</PageHeaderHeading>
          <PageHeaderDescription size='sm'>
            View detailed information about your order
          </PageHeaderDescription>
        </div>
      </PageHeader>

      <section className='mt-6'>
        <OrderDetails />
      </section>
    </Shell>
  );
};

export default OrderDetailsPage;
