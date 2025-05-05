'use client'
import React, { useEffect, useState } from 'react'
import {loadStripe} from '@stripe/stripe-js';
import SummaryApi from '@/app/api'
import { MdDelete } from 'react-icons/md'

export default function Cartform() {
    const [cartProduct,setCartProduct] = useState([])
    const [Loading,setLoading] = useState()
    const loadingCart = new Array(4).fill(null)
    const fetchData = async() => {
        const dataResponse = await fetch(SummaryApi.addToCartViewProduct.url,{
            method:SummaryApi.addToCartViewProduct.method,
            credentials:"include",
            headers:{
                'Content-Type': 'application/json',
            },
        })
        const dataApi = await dataResponse.json()
        console.log("api",dataApi.data,dataApi.success)
        if(dataApi.success){
            setCartProduct(dataApi.data)
        }}
        const handleLoading = async() => {
            await fetchData()
        }

    const increaseQt = async(id,quantity) => {
        const dataResponse = await fetch(SummaryApi.updateCartProduct.url,{
            method:SummaryApi.updateCartProduct.method,
            credentials:"include",
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(({
                _id:id,
                quantity:quantity+1
            }))
        })
        const dataApi = await dataResponse.json()
        if(dataApi.success){
            fetchData()
        }
    }
    const decreaseQt = async(id,quantity) => {
        const dataResponse = await fetch(SummaryApi.updateCartProduct.url,{
            method:SummaryApi.updateCartProduct.method,
            credentials:"include",
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(({
                _id:id,
                quantity:quantity-1
            }))
        })
        const dataApi = await dataResponse.json()
        if(dataApi.success){
            fetchData()
        }
    }
    const deletCartProduct = async(id) => {
        const dataResponse = await fetch(SummaryApi.deletCartProduct.url,{
            method:SummaryApi.deletCartProduct.method,
            credentials:"include",
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                _id:id,
            })
        })
        const dataApi = await dataResponse.json()
        if(dataApi.success){
            fetchData()
        }
    }
    const totalQuantity = cartProduct?.reduce((previousValue,currentValue) => previousValue+currentValue.quantity,0)
    const totalPrice = cartProduct?.reduce((pre,cur) => pre+(cur.quantity*cur?.productId?.sellingPrice),0)

    const handlePayment = async(e) =>{
        const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
        const dataResponse = await fetch(SummaryApi.payment.url,{
            method:SummaryApi.payment.method,
            credentials:"include",
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                cartItems:cartProduct
            })
        })
        const dataApi = await dataResponse.json()
       if(dataApi?.id){
        const stripe = await stripePromise
        stripe.redirectToCheckout({sessionId:dataApi?.id})
       }
    }
    useEffect(() => {   
       setLoading(true)
       handleLoading()
       setLoading(false)
    },[])
    
    return (
    <div className='container mx-auto'>
        <div className='text-center text-lg my-3'>
            {
                (cartProduct?.length === 0 && !Loading) && (
                    <p className='bg-white py-5'>购物车空空</p>
                ) 
            }
            <div className='flex flex-col lg:flex-row '>
                <div className='w-full max-w-3xl'>
                    {
                        Loading ? (
                            loadingCart.map((el,index) =>{
                                return(
                                    <div key={el+"加载"+index}
                                    className='w-full bg-slate-200 h-32 my-2 border border-l-slate-300 animate-pulse rounded-2xl'>

                                    </div>
                                )
                            })
                        ) : (
                            cartProduct.map((product,index)=>{
                                return(
                                    <div key={product?._id+"购物车"}
                                    className='w-full bg-white h-40 my-2 border-slate-300 rounded-2xl flex items-cente'
                                    >
                                        <div className='w-36 h-40 bg-slate-200 '>
                                            <img src={product?.productId?.productImage[0] || ''} 
                                            className='w-full h-full object-scale-down mix-blend-multiply'/>
                                        </div>

                                        <div className='px-4 py-2 w-full relative'>
                                        <div 
                                        onClick={() => deletCartProduct(product?._id)}
                                        title= "移出购物车"
                                        className='float-right w-8 h-8 text-red-600 bg-white rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer'>
                                            <MdDelete className=''/>
                                        </div>
                                            <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>
                                                {product?.productId?.productName}
                                            </h2>
                                            <p className='capitalize text-slate-500'>
                                                {product?.productId?.category}
                                            </p>
                                            <div className='flex items-center justify-between'>
                                                <p className='text-red-600 pl-56 font-medium text-lg'>
                                                    单价:{product?.productId?.sellingPrice}
                                                </p>
                                                <p className='text-slate-600 font-semibold text-lg'>
                                                    {product?.productId?.sellingPrice * product?.quantity}
                                                </p>
                                            </div>
                                            
                                        </div>
                                        <div className='flex items-center gap-3 mt-1'>
                                                <button 
                                                onClick={() => decreaseQt(product?._id,product?.quantity)}
                                                disabled={product?.quantity <= 1}
                                                className='cursor-pointer border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center'>
                                                    -
                                                </button>
                                                <span className=''>{product?.quantity}</span>
                                                <button 
                                                onClick={() => increaseQt(product?._id,product?.quantity)}
                                                className='cursor-pointer border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center'>
                                                    +
                                                </button>
                                        </div>
                                        
                                    </div>
                                )
                            })
                        )
                    }
                </div>
                {
                    cartProduct[0] && (
                        <div className='py-3 px-6 mt-5 rounded-2xl lg:mt-0 w-full max-w-sm'>
                    {
                        Loading ? (
                            <div className='h-36 bg-slate-200 border-slate-300 animate-pulse'>
                            </div>
                        ):(
                            <div className='h-auto bg-white'>
                                <h2 className='text-white bg-red-600 px-4 py-1'>
                                    总计
                                </h2>
                                <div className='flex items-center mt-2 justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                    <p>数量</p>
                                    <p>{totalQuantity}</p>
                                </div>
                                <div className='flex items-center mt-2 justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                    <p>总价</p>
                                    <p>{totalPrice}</p>
                                </div>
                                <button onClick={handlePayment}
                                className="cursor-pointer w-full bg-blue-600 p-1 text-white mt-2">
                                    结算
                                </button>
                            </div>
                        )
                    }
                </div>
                    )
                }
                
            </div>
        </div>

    </div>
  )
}
