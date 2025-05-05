"use client"
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { FaStar, FaStarHalf } from 'react-icons/fa6'
import displayCurrency from '../actions/displayCurrency'
import { useParams, useRouter } from 'next/navigation'
import SummaryApi from '@/app/api'
import VerticalCardProduct from './VerticalCardProduct'
import CategoryWiseProductDisplay from './CategoryWiseProductDisplay'
import addToCart from '../actions/addToCart'
import Context from '@/context'

export default function ProductDetails() {
  const router = useRouter()

  const [ActiveImage,setActiveImage] = useState("")
  const { fetchUserAddToCart } = useContext(Context)
  const handleAddToCart = async(e,id) =>{
      await addToCart(e,id)
      fetchUserAddToCart()
  }

  const [Data,setData] = useState({
          productName:"",
          brandName:"",
          category:"",
          productImage:[],
          description:"",
          price:'',
          sellingPrice:"",
      })
  const [ZoomImage,setZoomImage] = useState(false)
  const [ZoomImageCoordinate,setZoomImageCoordinate] = useState({
    x:0,
    y:0
  })
  const [Loading,setLoading] = useState(false)
  const productImageListLoading = new Array(13).fill(null)

  const handleZoomImage = useCallback((e) =>{
    setZoomImage(true)
    const {left,top,width,height} =e.target.getBoundingClientRect()
    const x = (e.clientX-left) / width
    const y = (e.clientY- top) / height
    setZoomImageCoordinate({
      x,
      y
    })
  },[ZoomImageCoordinate])

  const handleLeaveImageZoom = () => {
    setZoomImage(false)
  }
  const handleMouseEnterProduct = (imageUrl) =>{
    setActiveImage(imageUrl)
  }
  const params = useParams()
  // console.log("params",params.slug)
  const fetchProductDetails = async() => {
    const response = await fetch(SummaryApi.ProductDetails.url,{
      method:SummaryApi.ProductDetails.method,
      headers:{
        "content-type" : "application/json"
      },
      body: JSON.stringify({
        productId:params?.slug
      })
    })
    setLoading(false)
    const dataResponse = await response.json()
    console.log("dataResponse:", dataResponse)
    setData(dataResponse?.data)
    setActiveImage(dataResponse?.data?.productImage[0])
  }

  const handleBuyProduct = async(e,id) =>{
    await addToCart(e,id)
    fetchUserAddToCart()
    router.push('/Cart')
  }


  useEffect(() => {
    fetchProductDetails()
    console.log(Data)
  },[params])


  return (
    <div className=' container mx-auto p-4'>
      商品详情
    <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
      <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
        <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-300 relative  rounded p-2'>
            <img src={ActiveImage} className='h-full w-full  object-scale-down mix-blend-multipy' 
            onMouseMove={handleZoomImage} 
            onMouseLeave={handleLeaveImageZoom} />
            {
              ZoomImage && (
                <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                  <div 
                  style ={{
                    backgroundImage:`url(${ActiveImage})`,
                    backgroundRepeat:'no-repeat',
                    backgroundPosition:`${ZoomImageCoordinate.x *100}% ${ZoomImageCoordinate.y*100}%`
                  }}
                  className='w-full h-full min-h-[400px] min-w-[500px]'>

                  </div>
                </div>
              )
            }
        </div>
        <div className='h-full'>
            {
               Loading ? (
                  <div className='flex gap-2 lg:flex-col overflow-scroll h-full'>
                      {
                        productImageListLoading.map((el,index) => {
                          return(
                            <div key={"loadingImage"+index} 
                            className='h-20 w-20 bg-slate-200 rounded-2xl animate-pulse'>

                            </div>
                          )
                        })
                      }
                  </div>
               ) : (
                <div 
                style={{
                  scrollbarWidth: 'none', // Firefox
                  msOverflowStyle: 'none', // IE 10+
              }}
                className='flex gap-2 lg:flex-col overflow-scroll h-full'>
                    {
                      Data?.productImage?.map((imgUrl,index) => {
                        return (
                          <div key={imgUrl} 
                          className='h-20 w-20 bg-slate-200 rounded-2xl animate-pulse'>
                            <img src={imgUrl} 
                            className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer'
                            onMouseEnter={() => handleMouseEnterProduct(imgUrl)}/>
                          </div>
                        )
                      })
                    }
                </div>
               )
            }
        </div>
      </div>
      {
        Loading ? (
          <div className='grid gap-1 w-full'>
            <p className='bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block'></p>
            <h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8 bg-slate-200 animate-pulse w-full'></h2>
            <p className=' capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8 w-full'></p> 
            <div className='text-red-600 bg-slate-200 h-6 lg:h-8 animate-pulse flex items-center gap-1 w-full'>

            </div>
            <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium m-1 h-6 lg:h-8 animate-pulse w-full'>
              <p className='text-red-600 bg-slate-200 w-full'></p>
              <p className='text-slate-400 line-through bg-slate-200 w-full'></p>
            </div>
            <div className='flex items-center gap-3 my-2 w-full'>
              <button className='h-6 lg:h-8 bg-slate-200 rounded-2xl animate-pulse w-full'></button>
              <button className='h-6 lg:h-8 bg-slate-200 rounded-2xl animate-pulse w-full'></button>
            </div>
            <div className='w-full'>
              <p className='text-slate-600 font-medium my-1 h-6 lg:h-8 bg-slate-200 rounded-2xl animate-pulse w-full'></p>
              <p className='text-slate-200 rounded-2xl animate-pulse h-10 lg:h-12 w-full'></p>
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-1'>
            <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{Data?.brandName}</p>
            <h2 className='text-2xl lg:text-4xl font-medium'>{Data?.productName}</h2>
            <p className='text-slate-400 line-through'>{Data?.category}</p>
            <div className='text-red-600 flex items-center gap-1'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
            </div>
            <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
              <p className='text-red-600'>{displayCurrency(Data?.sellingPrice)}</p>
              <p className='text-slate-400 line-through'>{displayCurrency(Data.price)}</p>
            </div>
            <div className='flex items-center gap-3 my-2'>
              <button 
              className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white'
              onClick={(e) => handleBuyProduct(e,Data?._id)}>
                立即购买
                </button>
              <button 
              className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] bg-red-600 text-white font-medium hover:text-red-600 hover:bg-white'
              onClick={(e) => handleAddToCart(e,Data?._id)}>
                加入购物车
              </button>
              </div>
              <div>
                <p className='text-slate-600 font-medium my-1'>产品介绍:</p>
                <p>{Data?.description}</p>
              </div>
          </div>

        )
      }
    </div>
      {Data?.category && (
        // <VerticalCardProduct category={Data?.category} heading={"同类商品"}/>
        <CategoryWiseProductDisplay category={Data?.category} heading={"同类商品"}/>
      )}
      
    </div>
  )
}
