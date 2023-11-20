"use client"
import Breadcrumb from '@/components/ui/breadcrumb'
import { useProductQuery } from '@/hooks/api/product/useGetProduct'
import { QuickViewProduct } from '@/modules/products/quickView'
import React from 'react'
import ProductDetails from '../screens/ProductDetails'
import { IProduct } from '@/types'
type Props = {
    params:{
        productSlug:string
    }
}
const Product = ({params:{productSlug}}:Props) => {
  const {data,isLoading} = useProductQuery(productSlug)
  return (
    <div className='py-5  '>
      <section className='py-5 bg-gray-100 dark:bg-gray-900 '>
        <div className='flex justify-between items-center container'>
        <h1>djf</h1>
        <Breadcrumb />
        </div>
        
      </section>

      <div className='flex items-center space-x-3 container'>
       <div className='w-full md:w-[70%] '>
        <ProductDetails {...{product:data as IProduct}}/>
       </div>
       <div className='flex md:w-[30%] w-full'>
        gfdg
       </div>
      </div>
    </div>
  ) 
}

export default Product