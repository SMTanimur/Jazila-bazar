"use client"
import { useType } from '@/hooks/api/type/useGetTypes';
import dynamic from 'next/dynamic';
const ErrorMessage = dynamic(() => import('@/components/ui/error-message'));
const BannerWithSearch = dynamic(
  () => import('@/components/banners/banner-with-search')
);



const Banner: React.FC<{ layout: string; variables: any }> = ({
  layout,
  variables,
}) => {
  const { type, error } = useType('');
  if (error) return <ErrorMessage message={error.message} />;
  
  return (
    < BannerWithSearch  banners={type?.banners} layout={layout}  />
  );
};

export default Banner;
