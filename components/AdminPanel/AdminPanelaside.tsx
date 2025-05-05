'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import ROLE from '../common/role'
import { redirect } from 'next/navigation'

export default function AdminPanelaside() {
    const dispatch = useDispatch()
    const user = useSelector(state => state?.user?.user)
    useEffect(() => {
        if(user?.role !== ROLE.ADMIN){
            redirect("/")
        }
    },[user])
  return (
        <aside className='bg-white min-h-full w-full min-w-30 max-w-60 mr-2'>
            <div className='h-32 flex justify-center items-center flex-col'>
            <div className='text-3xl cursor-pointer relative flex justify-center'>
                            { user?.profilePic ? (
                                <Image width={10} height={10} alt={user?.name} className='w-10 h-10 rounded-full' src={user?.profilePic}></Image>
                            ):(
                            <FaRegCircleUser />
                            )}
            </div>
            <p className=' capitalize text-lg font-semibold'>
                {user?.name}
            </p>
            <p className='text-sm'>
                {user?.role}
            </p>
            </div>
            <div>
                <nav className='grid p-4'>
                    <Link href="/AdminPanel/Alluser" className='px-2 py-1 hover:bg-slate-100'>所有用户</Link>
                    <Link href="/AdminPanel/Allproduct" className='px-2 py-1 hover:bg-slate-100'>产品</Link>
                </nav>
            </div>
        </aside>


  )
}