import React, { useState } from 'react'
import AdminEditProduct from './AdminEditProduct'
import { MdModeEditOutline } from 'react-icons/md'
import displayCurrency from '../actions/displayCurrency'

export default function AdminProductCard({
    data,
    fetchData,
    index
}) {
  const [EditProduct,setEditProduct] = useState(false)
  return (
    <div className='bg-white p-4 rounded-2xl'>
      <div className='w-40 '>
        <div className='w-32 h-32 flex justify-center items-center'>
          <img src = {data?.productImage[0]} width={120} height={120} className='w-fit mx-auto object-fill h-full' />
      </div>
          <h2 className='text-ellipsis line-clamp-2'>{data.productName}</h2>
        <div>
          <h2>
            {
              displayCurrency(data.sellingPrice)
            }
            </h2>
        </div>
        <div 
        onClick={() => setEditProduct(true)}
        className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer'>
          <MdModeEditOutline />
        </div>
      </div>
        
        {
          EditProduct && (
          <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata ={fetchData}/>
          )
          }
    </div>
  )
}
