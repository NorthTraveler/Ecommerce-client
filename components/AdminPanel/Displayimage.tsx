import Image from 'next/image'
import React from 'react'
import { CgClose } from 'react-icons/cg'

export default function DisplayImage({
   imgUrl,
   onClose,
}) {
  return (
    <div className='fixed bottom-0 top-0 left-0 right-0 flex justify-center items-center'>
        <div className='bg-white shadow-lg rounded-sm max-w-5xl mx-auto p-4'>
            <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                <CgClose />
            </div>
            <div className='flex justify-center p-4 max-w-[80vh] max-h-[80vh]'>
                <img src={imgUrl} alt='productImage' className='w-full h-full'/>
            </div>
        </div>
    </div>
  )
}
