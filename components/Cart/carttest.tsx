'use client'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import SummaryApi from '@/app/api'

export default function Carttest() {
    const [cartProduct, setCartProduct] = useState([])
    const [loading, setLoading] = useState(true)
    
    const fetchData = async (signal) => {
        try {
            setLoading(true)
            const dataResponse = await fetch(SummaryApi.addToCartViewProduct.url, {
                method: SummaryApi.addToCartViewProduct.method,
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                signal
            })

            // 增加响应状态码检查
            if (!dataResponse.ok) {
                throw new Error(`HTTP error! status: ${dataResponse.status}`)
            }

            const dataApi = await dataResponse.json()
            
            // 添加数据格式验证
            if (!dataApi.success || !Array.isArray(dataApi.data)) {
                throw new Error('无效的API响应结构')
            }

            setCartProduct(dataApi.data)
            
            // 添加临时调试日志
            console.log('API数据已设置:', dataApi.data)
            
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error("请求错误详情:", {
                    message: error.message,
                    stack: error.stack
                })
                toast.error(error.message || '加载购物车数据失败')
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const abortController = new AbortController()
        let isMounted = true  // 添加挂载状态检查
        
        const loadData = async () => {
            try {
                await fetchData(abortController.signal)
                if (!isMounted) return
                // 可在此添加后续操作
            } catch (error) {
                if (!isMounted) return
                console.error("顶层错误捕获:", error)
            }
        }

        loadData()

        return () => {
            isMounted = false
            abortController.abort()
        }
    }, [])

    // 调试用Effect
    useEffect(() => {
        console.log('购物车产品状态更新:', cartProduct)
    }, [cartProduct])

    // 计算总数量和总价
    const calculateTotals = () => {
        return cartProduct.reduce((acc, product) => {
            const price = product?.productId?.sellingPrice || 0
            const quantity = product?.quantity || 0
            return {
                totalQuantity: acc.totalQuantity + quantity,
                totalPrice: acc.totalPrice + (price * quantity)
            }
        }, { totalQuantity: 0, totalPrice: 0 })
    }

    const { totalQuantity, totalPrice } = calculateTotals()

    return (
        <div className='container mx-auto'>
            <div className='text-center text-lg my-3'>
                {cartProduct.length === 0 && !loading && (
                    <p className='bg-white py-5'>购物车空空</p>
                )}
                <div className='flex flex-col lg:flex-row'>
                    {/* 商品列表 */}
                    <div className='w-full max-w-3xl'>
                        {loading ? (
                            /* 加载状态 */
                            [...Array(4)].map((_, index) => (
                                <div 
                                    key={`loading-${index}`}
                                    className='w-full bg-slate-200 h-32 my-2 border border-l-slate-300 animate-pulse rounded-2xl'
                                />
                            ))
                        ) : (
                            /* 实际商品数据 */
                            cartProduct.map((product) => {
                                // 添加数据验证
                                if (!product?.productId) {
                                    console.warn('无效的商品数据:', product)
                                    return null
                                }

                                const productData = product.productId
                                const price = productData.sellingPrice || 0
                                const quantity = product.quantity || 0

                                return (
                                    <div 
                                        key={`${product._id}-${product.updatedAt}`} // 更可靠的key
                                        className='w-full bg-white h-32 my-2 border-slate-300 rounded-2xl grid grid-cols-[128px,1fr]'
                                    >
                                        {/* 商品图片 */}
                                        <div className='w-32 h-32 bg-slate-200'>
                                            {productData.productImage?.[0] && (
                                                <img 
                                                    src={productData.productImage[0]} 
                                                    alt={productData.productName}
                                                    className='w-full h-full object-scale-down mix-blend-multiply'
                                                    onError={(e) => {
                                                        e.target.src = '/default-product.png'
                                                    }}
                                                />
                                            )}
                                        </div>
                                        
                                        {/* 商品详情 */}
                                        <div className='px-4 py-2 relative'>
                                            <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>
                                                {productData.productName || '未知商品'}
                                            </h2>
                                            <p className='capitalize text-slate-500'>
                                                {productData.category || '未分类'}
                                            </p>
                                            <div className='flex justify-between items-center mt-2'>
                                                <div>
                                                    <p className='text-red-600 font-medium text-lg'>
                                                        ¥{price.toFixed(2)}
                                                    </p>
                                                    <p className='text-slate-600 font-semibold text-lg'>
                                                        小计: ¥{(price * quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                                <div className='flex items-center gap-3'>
                                                    <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center'>
                                                        -
                                                    </button>
                                                    <span>{quantity}</span>
                                                    <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center'>
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>

                    {/* 结算面板 */}
                    <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                        {loading ? (
                            <div className='h-36 bg-slate-200 border-slate-300 animate-pulse rounded-lg' />
                        ) : (
                            <div className='h-36 bg-white rounded-lg shadow-md'>
                                <h2 className='text-white bg-red-600 px-4 py-2 rounded-t-lg'>
                                    订单概要
                                </h2>
                                <div className='p-4 space-y-3'>
                                    <div className='flex justify-between'>
                                        <span className='text-gray-600'>商品总数:</span>
                                        <span className='font-semibold'>{totalQuantity} 件</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-gray-600'>总计金额:</span>
                                        <span className='font-semibold text-red-600'>
                                            ¥{totalPrice.toFixed(2)}
                                        </span>
                                    </div>
                                    <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition-colors">
                                        立即结算
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}