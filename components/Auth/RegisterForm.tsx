import React, { useState } from 'react'
import loginIcons from "@/public/assest/signin.gif"
import Image from 'next/image'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import Link from 'next/link'
import { imageToBase64 } from '../actions/imageToBase64'
import SummaryApi from '@/app/api'
import { toast } from 'react-toastify'
import { redirect } from 'next/navigation'

export default function RegisterForm() {
  const [showPassword,setShowPassword] = useState(false)
  const [showConfirmPassword,setShowConfirmPassword] = useState(false)
    const [RegisterData,setRegisterData] = useState({
        name:"",
        email:"",
        password:"",
        confirmpassword:"",
        profilePic:""
    })
    const handleChange = (e: { target: { name: any; value: any } }) =>{
        const {name,value} = e.target
        setRegisterData((pre) => {
            return {
                ...pre,
                [name]:value,
            }
        } )
    }   
    const handleSubmit = async (e: { preventDefault: () => void }) =>{
        e.preventDefault()
        if(RegisterData.password === RegisterData.confirmpassword){
            const dataResponse = await fetch(SummaryApi.signUP.url,{
                method:SummaryApi.signUP.method,
                credentials:"include",
                headers:{
                    "content-type" : "application/json"
                },
                body:JSON.stringify(RegisterData)
            })
            const dataApi = await dataResponse.json()
            if(dataApi.success){
                toast.success(dataApi.message)
                redirect("/Login")
            }
            if(dataApi.error){
                toast.error(dataApi.message)
            }
            // console.log("data",dataApi)
        }
        else{
            console.log("请确认密码相同")
        }
    }
    const handleUploadPic =async (e) =>{
      const file = e.target.files[0]
      const imagePic = await imageToBase64(file)
      setRegisterData((pre) => {
        return{
          ...pre,
          profilePic:imagePic
        }
      })

    }
  return (
    <section id="login" className=''>
        <div className='mx-auto container p-4'>
            <div className='bg-white p-2 py-5 w-full max-w-md mx-auto rounded-3xl'>

                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full' >
                  <div>
                      <Image alt="Login Icon" width="200" height="200" src={ RegisterData.profilePic || loginIcons} />
                  </div>
                  <form>
                  <label>
                        <div className='text-xs opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                            上传图像
                        </div>
                        <input type='file' className='hidden' onChange={handleUploadPic}></input>
                    </label>
                  </form>
                </div>

                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div className='grid px-5'>
                        <label className=''>
                            名称:
                        </label>
                        <div className='bg-slate-100 p-2'>
                            <input type='name' 
                            name='name' placeholder='请输入名称' 
                            value={RegisterData.name}
                            onChange={handleChange}
                            required
                            className='w-full h-full outline-none bg-transparent'></input>
                        </div>
                    </div>

                    <div className='grid px-5'>
                        <label className=''>
                            邮箱:
                        </label>
                        <div className='bg-slate-100 p-2'>
                            <input type='email' 
                            name='email' placeholder='请输入邮箱' 
                            value={RegisterData.email}
                            onChange={handleChange}
                            required
                            className='w-full h-full outline-none bg-transparent'></input>
                        </div>
                    </div>

                    <div className='px-5'>
                        <label className='py-3'>
                            密码:
                        </label>
                        <div className='bg-slate-100 p-2 flex'> 
                            <input type={showPassword?"text":'password'} 
                            value={RegisterData.password}
                            name='password' placeholder='请输入密码' 
                            onChange={handleChange}
                            required
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

                        <label className='py-3'>
                            确认密码:
                        </label>
                        <div className='bg-slate-100 p-2 flex'> 
                            <input type={showConfirmPassword?"text":'password'} 
                            value={RegisterData.confirmpassword}
                            name='confirmpassword' placeholder='请确认输入的密码' 
                            onChange={handleChange}
                            required
                            className='w-full h-full outline-none bg-transparent' />
                            <div onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='cursor-pointer text-xl relative'>
                                <span>
                                    {
                                        showConfirmPassword?
                                        (<FaEye/>)
                                        :
                                        (<FaEyeSlash />)
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                    <button
                    className='bg-red-500 text-wite px-6 mt-5 py-2 w-full max-w-[150px] rounded-full hover: scale-110 hover:bg-red-700 transition-all mx-auto block '>
                        注册
                    </button>
                </form>
                <div className='px-5 py-3'>
                    <p> 已有账户？<Link href={"/Login"} className='text-red-600 hover:text-red-700 hover:underline'>点此登录</Link></p>
                </div>  
          </div>
        </div>
    </section>
  )
}
