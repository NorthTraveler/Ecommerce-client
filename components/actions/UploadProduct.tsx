import { describe } from 'node:test'
import React, { useState } from 'react'
import productCategory from '../common/productCategory'
import Image from 'next/image'
import { MdDelete } from 'react-icons/md'
import DisplayImage from '../AdminPanel/Displayimage'
import { FaCloudArrowUp } from 'react-icons/fa6'
import uploadImage from './uploadImage'
import SummaryApi from '@/app/api'
import { toast } from 'react-toastify'
import { CgClose } from 'react-icons/cg'


export default function UploadProduct({
    onClose,
    fetchdata,
}) {
    const [openFullScreenImage,setOpenFullScreenImage] = useState(false)
    const [fullScreenImage,setFullScreenImage] = useState("")
    const [UploadProductImageInput,setUploadProductImageInput] = useState("")
    const [productdata,setProductdata] = useState({
        productName:"",
        brandName:"",
        category:"airpods",
        productImage:[],
        description:"",
        price:'',
        sellingPrice:"",
    })
    const handleOnChange = (e) =>{
        const {name,value} =e.target
        setProductdata((pre) => {
            return{
            ...pre,
            [name]:value,
        }})
    }

    const handleDeleteProductImage = (index) =>{
        const newProductImage = [...productdata.productImage]
        newProductImage.splice(index,1)
        setProductdata((pre) => {
            return{
            ...pre,
            productImage:[...newProductImage]
        }})
    }

    const handleUploadProduct = async (e) =>{
        const file = e.target.files[0]
        const uploadImageCloudnary = await uploadImage(file)
        console.log("Cloud",uploadImageCloudnary.url)
        setProductdata((pre) => {
            return{
            ...pre,
            productImage : [...pre.productImage, uploadImageCloudnary.url]
        }})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const dataResponse = await fetch(SummaryApi.uploadProduct.url,{
            method:SummaryApi.uploadProduct.method,
            credentials:"include",
            headers:{
                "content-type" : "application/json"
            },
            body:JSON.stringify(productdata)
        })
        const dataApi = await dataResponse.json()
        if (dataApi.success){
            toast.success(dataApi.message)
            onClose()
            fetchdata()
        }
    }

  return (
    <div className='fixed w-full h-full bg-slate-200 opacity-80 top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
        <div className='bg-white p-4 rounded-2xl w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
           <div className='flex justify-between items-center pb-3'>
            <h2 className='font-bold text-lg'>添加产品</h2>
            <div 
            onClick={onClose}
            className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer'>
                <CgClose />
            </div>
            </div>
            <form 
            onSubmit={handleSubmit}
            className='grid p-4 gap-2 overflow-y-scroll h-full pb-5'>
                <label htmlFor='productName'>产品名称
                    <input type='text' 
                    placeholder='请输入产品名称' 
                    id="productName" 
                    name='productName'
                    value={productdata.productName}
                    onChange={handleOnChange}
                    className='ml-3 p-2 bg-slate-100 border rounded-2xl'
                    required>
                    </input>
                </label>

                <label htmlFor='brandName'>品牌名称
                    <input type='text' 
                    placeholder='请输入品牌名称' 
                    id="brandName" 
                    name='brandName'
                    value={productdata.brandName}
                    onChange={handleOnChange}
                    className='p-2 ml-3 bg-slate-100 border rounded-2xl'
                    required>
                    </input>
                </label>
                <label htmlFor='category'>
                    目录
                </label>
                   <select className='border px-4 py-1 rounded-2xl'
                   name='category'
                   value={productdata.category}
                   onChange={handleOnChange}>
                    {
                        productCategory.map((el,index) =>{
                            return (
                                <option value={el.value} key={el.value+index}>
                                    {el.label}  
                                    </option>
                            )
                        })
                    }
                   </select>
                    <label htmlFor='productImage' className='mt-3'>
                        产品图片
                    </label>
                    <label htmlFor='uploadImageInput'>
                        <div className='p-2 bg-slate-100 border rounded-2xl h-32 w-full flex justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                <span className='text-4xl'><FaCloudArrowUp/></span>
                                <p className='text-sm'>上传产品图像</p>
                                <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct}>
                                </input>
                            </div>
                        </div>
                    </label>
                    <div>
                        {
                            productdata?.productImage[0] ? (
                                <div className='flex items-center gap-2'>
                                    {
                                        productdata.productImage.map((el,index) =>(
                                            <div key={index} className='relative group'>
                                                
                                                <img 
                                                src={el} 
                                                alt={el} 
                                                width={80}
                                                height={80} 
                                                className='bg-slate-100 border cursor-pointer'
                                                onClick={() => {
                                                    setOpenFullScreenImage(true)
                                                    setFullScreenImage(el)
                                                }}/>

                                                <div 
                                                className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' 
                                                onClick={() => handleDeleteProductImage(index)}>
                                                   <MdDelete/>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            ):(
                                <p> </p>
                            )
                        }
                    </div>
                
                <label htmlFor='price'>价格
                    <input type='number' 
                    placeholder='价格' 
                    id="price" 
                    name='price'
                    value={productdata.price}
                    onChange={handleOnChange}
                    className='p-2 ml-3 bg-slate-100 border rounded-2xl'
                    required>
                    </input>
                </label>

                <label htmlFor='sellingPrice' >定价
                    <input type='number' 
                    placeholder='定价' 
                    id="sellingPrice" 
                    name='sellingPrice'
                    value={productdata.sellingPrice}
                    onChange={handleOnChange}
                    className='p-2 ml-3 bg-slate-100 border rounded-2xl'
                    required>
                    </input>
                </label>

                <label htmlFor='description'>介绍</label>
                <textarea className='h-28 bg-slate-100 rounded-2xl border resize-none p-1 mb-2'
                placeholder='输入产品介绍'
                rows={3}
                onChange={handleOnChange}
                name='description'
                value={productdata.description}
                >

                </textarea>
                <button className='mb-10 px-3 py-2 cursor-pointer text-white bg-red-600 rounded-2xl hover:bg-red-800'>上传产品</button>
            </form>
        </div>
        {
            openFullScreenImage && (
                <DisplayImage imgUrl={fullScreenImage} onClose={() =>setOpenFullScreenImage(false)} />
            )
        }
    </div>
  )
}
