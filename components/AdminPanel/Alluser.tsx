import SummaryApi from '@/app/api'
import { setUserDetails } from '@/store/userSlice'
import { useEffect, useState } from 'react'
import { MdModeEdit } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import ChangeUserRole from './ChangeUserRole'

export default function AllUsersForm(){
    const dispatch = useDispatch()
    const [AllUsers,setAllUsers] = useState([])
    const [OpenUpdateRole,setOpenUpdateRole] = useState(false)
    const [UpdateUserDetails,setUpdateUserDetails] = useState({
        email:"",
        name:"",
        role:"",
        _id:"",
    })
    const fetchAllUsers = async()=>{
        const dataResponse = await fetch(SummaryApi.all_user.url,{
            method:SummaryApi.all_user.method,
            credentials:"include"
        })
    const dataApi = await dataResponse.json()
    console.log("alluser",dataApi)
    if(dataApi.success){
        dispatch(setAllUsers(dataApi.data))
    }
    if(dataApi.error){
        toast(dataApi.message)
    }
    }
    useEffect(() => {
        fetchAllUsers()
    },[])
  return (
    <div className='bg-slate-100 p-3 w-full'>
        <table className='min-w-full'>
            <thead>
                <tr className='bg-black text-white'>
                    <th>序号</th>
                    <th>名称</th>
                    <th>邮箱</th>
                    <th>权限</th>
                    <th>创建日期</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody className='pl-12'>
                {AllUsers.map((el,index) => {
                    return (
                        <tr key={el._id}>
                            <td>{index+1}</td>
                            <td>{el.name}</td>
                            <td>{el.email}</td>
                            <td>{el.role}</td>
                            <td>{el.createdAt}</td>
                            <td>
                                <button 
                                onClick={() => {
                                    setUpdateUserDetails(el)
                                    setOpenUpdateRole(true)
                                }}
                                className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'> 
                                    <MdModeEdit />
                                </button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        {
            OpenUpdateRole && (
                <ChangeUserRole 
                onClose ={() => setOpenUpdateRole(false)}
                name = {UpdateUserDetails.name}
                email = {UpdateUserDetails.email}
                role = {UpdateUserDetails.role}
                userId = {UpdateUserDetails._id}
                callDF={fetchAllUsers}
                />
            )
        }
    </div>
  )
}
