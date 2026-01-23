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
      <PageHeader id='order-details-header' aria-labelledby='order-details-header-heading'>
        <div className="flex items-center gap-4">
          <Link href="/account/orders">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Orders
            </Button>
          </Link>
          <div>
            <PageHeaderHeading size='sm'>Order Details</PageHeaderHeading>
            <PageHeaderDescription size='sm'>
              View detailed information about your order
            </PageHeaderDescription>
          </div>
        </div>
      </PageHeader>

      <section className='mt-6'>
        <OrderDetails />
      </section>
    </Shell>
  );
};

export default OrderDetailsPage;
