'use client'
import React, { useEffect, useState } from 'react'
import VerticalProductCard from './VerticalProductCard';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import SummaryApi from '@/app/api';
import productCategory from '../common/productCategory';


export default function CategoryProduct() {
  const [Data,setData] = useState([])
  
  const [Loading,setLoading] = useState(false)
  const params = useSearchParams();
  const urlSearch = new URLSearchParams(params)
  // console.log(urlSearch)
  const urlCategoryListArray = urlSearch.getAll("category")
  // console.log(urlCategoryListArray)
  const urlCategoryListinObject ={}
  urlCategoryListArray.forEach(el => {
    urlCategoryListinObject[el] = true
  })
  const [selectCategory,setSelectCategory] = useState(urlCategoryListinObject)
  const [filterCategoryList, setFilterCategoryList] = useState([])
  const [sortBy, setSortBy] = useState("");

  const handleSelectCategory = (e) =>{
    const {name,value,checked} = e.target
    setSelectCategory((pre) => {
      return{
        ...pre,
        [value]:checked
      }
    })
  }

  const fetchData = async() => {
    const dataResponse = await fetch(SummaryApi.filterProduct.url,{
      method:SummaryApi.filterProduct.method,
      credentials:'include',
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({
        category:filterCategoryList
      })
    })
    const dataApi = await dataResponse.json()
      setData(dataApi?.data || [])
  }

  const handleOnChangeSortBy = (e) =>{
    const {value} = e.target
    setSortBy(value)
    if(value === "asc"){
      setData (pre=> pre.sort((a,b) => a.sellingPrice-b.sellingPrice))
    }
    if(value==="desc"){
      setData (pre=> pre.sort((a,b) => b.sellingPrice-a.sellingPrice))
    }
  }

  const router = useRouter()
  useEffect(() => {
    fetchData()
  },[filterCategoryList])


  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).map(CategoryKeyName => {
      if(selectCategory[CategoryKeyName]){
        return CategoryKeyName
      }
      return null
    }).filter(el => el)
    setFilterCategoryList(arrayOfCategory)
    const urlFormat = arrayOfCategory.map((el,index) => {
      if((arrayOfCategory.length -1) === index){
        return `category${el}`
      }
      return `category${el}&&`
    })
    const currentUrl = window.location.href;
    const newUrl = "/categoryproduct?" + urlFormat.join("");
    // redirect("/categoryproduct?"+urlFormat.join(""))
    if (currentUrl !== newUrl) {
      router.push(newUrl);
    }
  },[selectCategory])

  useEffect(() => {
  },[sortBy])


  return (
    <div className='mx-auto p-4 flex'> 
      <div className='w-40'>
        <div className='bg-white p-2 overflow-y-scroll'>
          <div>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 bg-slate-300'>
                排序:
              </h3>
              <form className='text-sm flex flex-col gap-2 py-2'>
                <div className='flex items-center gap-3'>
                        <input type="radio" name='sortBy' checked={sortBy === "asc"} onChange={handleOnChangeSortBy} value={"asc"} />
                        <label>价格低到高</label>
                      </div>
              </form>
              <form className='text-sm flex flex-col gap-2 py-2'>
                <div className='flex items-center gap-3'>
                        <input type="radio" name='sortBy' checked={sortBy === "desc"} onChange={handleOnChangeSortBy} value={"desc"} />
                        <label>价格高到低</label>
                      </div>
              </form>
          </div>
          <div className=''>
              <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 bg-slate-300'>
                排序:
              </h3>
              <form className='text-sm flex flex-col gap-2 py-2'>
                {
                  productCategory.map((categoryName,index) =>{
                    return (
                      <div key={index} 
                      className='flex items-center gap-3'>
                        <input type="checkbox" name={'category'} checked={selectCategory[categoryName?.value]} onChange={handleSelectCategory} value={categoryName?.value} />
                        <label htmlFor={categoryName.value}>{categoryName.label}</label>
                      </div>
                    )
                  })
                }
              </form>
          </div>
          </div>
          </div>
            <div className='px-4'>
              <p className='font-medium text-slate-800 text-lg my-2'>搜索结果:{Data.length}</p>
                <p className='font-medium text-slate-800 text-lg my-2'></p>
                <div className=''>
                  {
                    Data?.length !==0 && !Loading && (
                      <VerticalProductCard loading={Loading} Data = {Data} />
                    )
                  }
                </div>
              </div>
        
      
    </div>
  )
}
 