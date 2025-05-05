import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { CiSearch } from 'react-icons/ci'
import { FaRegCircleUser } from 'react-icons/fa6'
import { FaShoppingCart } from 'react-icons/fa'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import SummaryApi from '@/app/api'
import { setUserDetails } from '@/store/userSlice'
import { toast } from 'react-toastify'
import ROLE from '../common/role'
import Context from '@/context'
import { useRouter, useSearchParams } from 'next/navigation'
import { redirect } from 'next/navigation'


export const Header = () => {
    const [MenuDisplay,setMenuDisplay] = useState(false)
    const dispatch = useDispatch()

    const user = useSelector(state => state?.user?.user)
    const context = useContext(Context)
    const searchInput = useSearchParams()
    const handleLogout = async() => {
        const dataResponse = await fetch(SummaryApi.LogOut_user.url,{
            method:SummaryApi.LogOut_user.method,
            credentials:"include"
        })
    const dataApi = await dataResponse.json()  
    if(dataApi.success){
       toast.success(dataApi.message)
       dispatch(setUserDetails(null))
    }
    if(dataApi.error){
       toast.error(dataApi.message)
    }
    }
    const router = useRouter();

    const handleSearch = async(e) =>{
        const {value} = e.target
        if(value){
            router.push(`search?q=${value}`)
        }
        else{
            router.push("/search")
        }
    }
  return (
    <header className='h-16 shadow-md bg-white fixed z-40 w-full'>
        <div className='h-full container mx-auto flex items-center px-4 justify-between'>
            <div className=''>
                <Link href={'/'}>
                    <Logo w={90} h={50} />
                </Link>
            </div>
        
        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-sm'> 
            <input 
            onChange={handleSearch}
            type='text' placeholder='在此搜索' className='w-full pl-4 outline-none' />
            
            <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'> 
                <CiSearch />
            </div>
        </div>
        <div className='flex items-center gap-7'>
            <div className='relative flex justify-center'>
                { user?._id && (
                  <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => {setMenuDisplay(pre => !pre)}}>
                { user?.profilePic ? (
                    <Image width={10} height={10} alt={user?.name} className='w-10 h-10 rounded-full' src={user?.profilePic}></Image>
                ):(
                <FaRegCircleUser />
                )}
            </div>  
                )}
            { MenuDisplay && (
            <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                <nav>
                    {
                        user?.role == ROLE.ADMIN && (
                    <Link className='whitespace-nowrap hover:bg-slate-200 rounded-3xl p-2' href={"/AdminPanel"}>
                        用户
                    </Link>
                        )
                    }
                </nav>
            </div>
            )
            }
            </div>  
                {
                    user?._id  &&  (
                    <a href='/Cart' className='text-2xl relative'>
                        <span><FaShoppingCart /></span>
                        <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3 '>
                            <p className='text-sm'>{context?.CartProductCount}</p>
                        </div>
        
                    </a>
                    )
                }

                {
                    user?._id ? (
                        <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700 '>
                            登出
                        </button>
                    ):(
                        <Link href={"/Login"}  className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>登入</Link>
                    )
                }
            
            </div>
        </div>
        
    </header>
  )
}
