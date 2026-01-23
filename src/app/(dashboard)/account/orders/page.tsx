import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/common/shared/page-header';
import { Shell } from '@/components/shells/shell';
import { Metadata } from 'next';
import OrdersInformation from './components/OrdersInformation';

export const metadata: Metadata = {
  title: 'My Orders',
  description: 'View and manage your orders',
};

const MyOrders = () => {
  return (
    <Shell variant={'sidebar'}>
      <PageHeader id='orders-header' aria-labelledby='orders-header-heading'>
        <PageHeaderHeading size='sm'>My Orders</PageHeaderHeading>
        <PageHeaderDescription size='sm'>
          View and manage all your orders
        </PageHeaderDescription>
      </PageHeader>

      <section className='mt-6'>
        <OrdersInformation />
      </section>
    </Shell>
  );
};

export default MyOrders;