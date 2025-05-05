import React, { useContext, useState } from 'react'
import loginIcons from "@/public/assest/signin.gif"
import Image from 'next/image'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import Link from 'next/link'
import SummaryApi from '@/app/api'
import { toast } from 'react-toastify'
import { redirect } from 'next/navigation'
import Context from '@/context'

export default function LoginForm() {
    const [showPassword,setShowPassword] = useState(false)
    const [loginData,setLoginData] = useState({
        email:"",
        password:"",
    })
    const {fetchUserDetails,fetchUserAddToCart}  = useContext(Context)
    const handleChange = (e: { target: { name: any; value: any } }) =>{
        const {name,value} = e.target
        setLoginData((pre) => {
            return {
                ...pre,
                [name]:value,
            }
        } )
    }   
    const handleSubmit = async (e: { preventDefault: () => void }) =>{
        e.preventDefault()
        const dataResponse = await fetch(SummaryApi.signIN.url,{
            method:SummaryApi.signIN.method,
            credentials:"include",
            headers:{
                    "content-type" : "application/json"
                },
            body:JSON.stringify(loginData)
            })
            const dataApi = await dataResponse.json()
            if(dataApi.success){
                toast.success(dataApi.message)
                fetchUserDetails()
                fetchUserAddToCart()
                redirect("/")
            }
            if(dataApi.error){     
                toast.error(dataApi.message)
            }}
    
  return (
    <section id="login" className=''>
        <div className='mx-auto container p-4'>
            <div className='bg-white p-2 py-5 w-full max-w-md mx-auto rounded-3xl'>
                <div className='w-20 h-20 mx-auto'>
                    <Image  alt="Login Icon" src={loginIcons} />                    
                </div>

                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div className='grid px-5 py-2'>
                        <label className='py-3'>
                            邮箱:
                        </label>
                        <div className='bg-slate-100 p-2'>
                            <input type='email' 
                            name='email' placeholder='请输入邮箱' 
                            value={loginData.email}
                            onChange={handleChange}
                            className='w-full h-full outline-none bg-transparent'></input>
                        </div>
                    </div>

                    <div className='px-5'>
                        <label className='py-3'>
                            密码:
                        </label>
                        <div className='bg-slate-100 p-2 flex'> 
                            <input type={showPassword?"text":'password'} 
                            value={loginData.password}
                            name='password' placeholder='请输入密码' 
                            onChange={handleChange}
                            className='w-full h-full outline-none bg-transparent' />
                            <div onClick={() => setShowPassword(!showPassword)} className='cursor-pointer text-xl relative'>
                                <span>
                                    {
                                        showPassword?
                                        (<FaEye/>)
                                        :
                                        (<FaEyeSlash />)
                                    }
                                </span>
                            </div>
                        </div>
                        <div className='pt-2'>
                            <Link href={"/ForgetPassword"}>忘记密码？</Link>
                        </div>
                    </div>
                    <button
                    className='bg-red-500 text-wite px-6 mt-5 py-2 w-full max-w-[150px] rounded-full hover: scale-110 hover:bg-red-700 transition-all mx-auto block '>
                        登入
                    </button>
                </form>
                <div className='px-5 py-3'>
                    <p> 没有账户？<Link href={"/Register"} className='text-red-600 hover:text-red-700 hover:underline'>点此注册</Link></p>
                </div>  
          </div>
        </div>
    </section>
  )
}
