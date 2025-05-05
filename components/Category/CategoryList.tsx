import SummaryApi from '@/app/api'
import Link from 'next/navigation'

import React, { useEffect, useRef, useState } from 'react'

export default function CategoryList() {
    const scrollElement = useRef()
    const [CategoryProduct,SetCategoryProduct] = useState([])
    const [loading,SetLoading] = useState(false)
    const categoryLoading = new Array(13).fill(null)
    const fetchCategoryProduct = async() =>{
        SetLoading(true)
        const dataResponse = await fetch(SummaryApi.getCategoryProduct.url)
        const data = await dataResponse.json()
        SetCategoryProduct(data.data)
        SetLoading(false)
        // console.log(data.data)
    }
    useEffect(() => {
        fetchCategoryProduct()
    },[])
  return (
    <div className='container mx-auto p-4'>
        <div 
        ref={scrollElement}
        style={{
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE 10+
        }}
        className='flex items-center gap-4 justify-between overflow-x-scroll scroll-none'>
            {
                loading? (
                    categoryLoading.map((product,index) => {
                        return(
                                <div key={index}
                                className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse'>
                                    
                                </div>          
                        )
                    })      
                ):(
                    CategoryProduct.map((product,index) => {
                        return(
                            <div key={index}>
                            <a href={"/categoryproduct?category="+ product?.category} className=' cursor-pointer' key={product?.category}>
                                <div className='h-16 w-16 items-center justify-center md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse'>
                                    <img 
                                    className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'
                                    src={product?.productImage[0]} 
                                    />
                                </div>
                                <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                            </a>
                            </div>
                        )
                    })
                
                )
            }
        </div>
    </div>
  )
}
