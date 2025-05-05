'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import SummaryApi from '@/app/api';
import VerticalProductCard from '@/components/Category/VerticalProductCard';
export default function page() {
    const [Data,setData] = useState([])
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    // console.log(pathname, searchParams.get('q'));
    // console.log(searchParams)
    const params = searchParams.get('q')
    const fetchProduct = async() => {
        setLoading(true)
        const response = await fetch(SummaryApi.searchProduct.url+'?'+searchParams)
        const dataResponse = await response.json()
        setData(dataResponse.data)
        setLoading(false)
        console.log("data",dataResponse)
    }
    const [Loading,setLoading] = useState(true)
    useEffect(() => {
        fetchProduct()
    },[params])
  return (
    <div className='container mx-auto p-4'>
        {
            Loading && (
                <p className='text-lg text-center'>加载中....</p>
            )
        }
        <p className='text-lg font-semibold my-3'>
        搜索结果:{Data.length}
        </p>
        {
            Data?.length ===0 && !Loading && (
                <p className='bg-white text-lg text-center p-4'>
                    未找到相关产品
                </p>
            )
        }
        {
            Data?.length !==0 && !Loading && (
                <VerticalProductCard loading={Loading} Data={Data} />
            )
        }
    </div>
  )
}
