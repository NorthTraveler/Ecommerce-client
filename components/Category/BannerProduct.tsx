import React, { useEffect, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import image1 from '@/public/assest/banner/Banner1.jpg'
import image2 from '@/public/assest/banner/Banner2.jpg'
import image3 from '@/public/assest/banner/Banner3.jpg'
import image4 from '@/public/assest/banner/Banner4.jpg'
export default function BannerProduct() {
  const [CurrentImage,setCurrentImage] =useState(0)
  const desktopImages = [
    image1,
    image2,
    image3,
    image4,
  ]
  const nextImage = () => {
    if(desktopImages.length-1>CurrentImage){
      setCurrentImage(pre => pre+1)
    }
  }
  const preImage = () => {
    if(CurrentImage!=0){
      setCurrentImage(pre => pre-1)
    }
  }
  useEffect(() => {
    const interval = setInterval(() => {
      if(desktopImages.length -1 >CurrentImage){
        nextImage()
      }else{
        setCurrentImage(0)
      }
    },5000)
    return () => clearInterval(interval)
  } , [CurrentImage])
  return (
    <div className='container mx-auto px-4 rounded'>
        <div className='h-56 md:h-72 w-full bg-slate-300 relative'>
            <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
                <div className='flex justify-between w-full text-2xl'>
                    <button onClick={preImage} className='bg-white shadow-md rounded-full p-1 cursor-pointer'><FaAngleLeft/></button>
                    <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1 cursor-pointer'><FaAngleRight/></button>
                </div>
            </div>
            <div className='hidden md:flex w-full h-full overflow-hidden'>
                {
                  desktopImages.map((imageUrl,index) => {
                    return(
                      <div 
                      key={index}
                      className='w-full h-full min-w-full min-h-full' style={{transform:`translateX(-${CurrentImage*100}%)`}}>
                        <img src={imageUrl.src} className='w-full' />
                      </div>
                    )
                  })
                }
            </div>
        </div>
    </div>
  )
}
