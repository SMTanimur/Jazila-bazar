import Breadcrumb from '@/components/ui/breadcrumb'
import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
  title: 'Products Page'

};
const ProductsPage = async() => {
  return (
    <div>
        
        <Breadcrumb />
    </div>
  )
}

export default ProductsPage