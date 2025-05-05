import SummaryApi from '@/app/api'
import React, { useEffect, useState } from 'react'
import UploadProduct from '../actions/UploadProduct'
import AdminProductCard from './AdminProductCard'

export default function AllproductForm() {
    const [AllProduct,setAllProduct] = useState([])
    const [OpenUploadProduct,setOpenUploadProduct] = useState(false)
    const fetchAllProduct = async() => {
        const dataResponse = await fetch(SummaryApi.all_product.url,{

        })

        const dataApi = await dataResponse.json()
        console.log("Product data:",dataResponse)
        setAllProduct(dataApi?.data || [])
    }
    useEffect(() => {
        fetchAllProduct()
    },[])
  return (
    <div className='w-full'>
        <div className='flex bg-white py-2 px-4 justify-between items-center bg-center'>
            <h2 className='font-bold text-lg'>
                产品目录
            </h2>
            <button onClick={() => setOpenUploadProduct(true)} 
            className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full cursor-pointer'>
                添加产品
            </button>
        </div>  
        <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll '>
            {
                AllProduct.map((product,index) =>{
                    return (
                        <AdminProductCard key={index} data={product} index= {index} fetchData={fetchAllProduct}/>
                    )
                })
            }
        </div>
        {
            OpenUploadProduct && (
                <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchdata={fetchAllProduct}/>
            )
        }
    </div>
  )   
}
