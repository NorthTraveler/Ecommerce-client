import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../actions/fetchCategoryWiseProduct'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import Link from 'next/link'
import addToCart from '../actions/addToCart'
import Context from '@/context'
    
export default function VerticalCardProduct({category,heading}) {
    const { fetchUserAddToCart } = useContext(Context)
    const handleAddToCart = async(e,id) =>{
        await addToCart(e,id)
        fetchUserAddToCart()
    }
        const [Data,setData] = useState([])
        const [Loading,SetLoading] =useState(true)
        const LoadingList = new Array(13).fill(null)
        const [Scroll,setScroll] = useState(0)
        const scrollElement = useRef()
        const fetchdata= async() =>{
            SetLoading(true)
            const categoryProduct = await fetchCategoryWiseProduct(category)
            setData(categoryProduct?.data)
    
            SetLoading(false)
        }
        useEffect(() => {
            fetchdata()
        },[])
        const scrollRight = () =>{
            scrollElement.current.scrollTo({
                left: scrollElement.current.scrollLeft + 300,
                behavior: 'smooth'
            });
        };
        const scrollLeft = () =>{
            scrollElement.current.scrollTo({
                left: scrollElement.current.scrollLeft - 300,
                behavior: 'smooth'
            });
        };
      return (
        <div className=' container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-semibold py-2'>{heading}</h2>
            <div className='flex items-center gap-4 md:gap-6 overflow-scroll transition-all ' 
            ref={scrollElement}
            style={{
                scrollbarWidth: 'none', // Firefox
                msOverflowStyle: 'none', // IE 10+
            }}>
                <button onClick={scrollLeft} className='bg-white shadow-md rounded-full p-3 cursor-pointer absolute left-0'><FaAngleLeft/></button>
                <button onClick={scrollRight} className='bg-white shadow-md rounded-full p-3 cursor-pointer absolute right-0'><FaAngleRight/></button>
            {
                Data.map((product,index) => {
                    return(
                <div 
                    key={index}
                    className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                <Link href={`products/${product?._id}`}>
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
                        onClick={(e) => handleAddToCart(e,product._id)}
                        >添加到购物车
                        </button>
                </div>
                <div>
    
                </div>
            </div>
                    )
                })
            }
            </div>
        </div>
      )
    }
    