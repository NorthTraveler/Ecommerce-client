import Link from 'next/link'
import React, { useContext } from 'react'
import addToCart from '../actions/addToCart'
import Context from '@/context'

export default function VerticalProductCard({loading,Data}) {
    const LoadingList = new Array(13).fill(null)
    const { fetchUserAddToCart } = useContext(Context)
    const handleAddToCard = async(e,id) =>{
            await addToCart(e,id)
            fetchUserAddToCart()
        }
  return (
        <div className='grid grid-cols-[repeat(3,minmax(300px,320px))] justify-center md:gap-6 overflow-x-scroll transition-all ' 
            style={{
                scrollbarWidth: 'none', // Firefox
                msOverflowStyle: 'none', // IE 10+
            }}>

            { loading ? (
                LoadingList.map((product,index) => {
                    return (
                        <div 
                        key={index}
                        className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow flex'>
                        <div className=' bg-slate-100 h-32 p-4 min-w-[120px] md:min-w-[145px]'>
                            
                        </div>
                        <div className='p-4 w-full grid gap-2'>
                                <h2 className='font-medium text-base md:text-sm text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse'> </h2>
                                <p className=' capitalize text-slate-500 p-1 bg-slate-200 animate-pulse' >    </p>
                                <div className='flex gap-3 w-full'>
                                    <p className=' text-red-500 font-medium p-1 bg-slate-200 w-full animate-pulse'>        </p>
                                    <p className=' line-through text-slate-500 p-1 bg-slate-200 w-full animate-pulse'>       </p>
                                </div>
                                <button className=' cursor-pointer text-sm px-3 py-0.5 rounded-full bg-slate-200 w-full animate-pulse'> </button>
                            </div>
                        </div>
                    )
                })
            ):(
                Data.map((product,index) => {
                    return(
                <div 
                    key={index}
                    className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                <Link href={`products/${product?._id}`} onClick={() => window.scrollTo({top:0,behavior:"smooth"})}>
                <div className=' bg-slate-100 h-48 p-4 min-w-[120px] md:min-w-[145px] flex justify-center items-center'>
                    <img className='object-scale-down h-full' src={product.productImage[0]} />
                </div>
                </Link>
                <div className='p-4 grid gap-3'>
                        <h2 className='font-medium text-base md:text-sm text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                        <p className=' capitalize text-slate-500'>{product?.category}</p>
                        <div className='flex gap-3'>
                            <p className=' text-red-500 font-medium'>{product?.sellingPrice}</p>
                            <p className=' line-through text-slate-500'>{product?.price}</p>
                        </div>
                        <button 
                        className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full'
                        onClick={(e) => handleAddToCard(e,product._id)}
                        >添加到购物车
                        </button>
                </div>
            </div>
                    )
                })
            )
            }
        </div>
  )
}
