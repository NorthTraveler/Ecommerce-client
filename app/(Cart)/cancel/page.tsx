import React from 'react'
import image from "@/public/assest/card-payment-cancel.png"
export default function page() {
  return (
    <div className='bg-slate-200 w-full mx-w-md mx-auto flex justify-center items-center flex-col p-4 m-2'>
        <img src={image.src} width={150} height={150} />
        <p className='text-red-600 font-bold text-xl'>订单已取消</p>
        <a href={'/cart'} className='py-2 px-3 mt-5 border-2 border-red-600 font-semibold rounded-2xl hover:text-white cursor-pointer'>回到购物车</a>
    </div>
  )
}
