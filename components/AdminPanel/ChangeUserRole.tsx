import SummaryApi from "@/app/api"
import { useState } from "react"
import { toast } from "react-toastify"
import ROLE from "../common/role"
import { IoMdClose } from "react-icons/io"
const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callDF
}) => {
    const [UserRole,setUserRole] = useState(role)
    const handleOnChangeSelect = (e) => {
            setUserRole(e.target.value)
            console.log("userrole:",e.target.value,UserRole)
            
        }
        const updateUserRole = async() =>{
            const dataResponse = await fetch(SummaryApi.updateUser.url,{
                    method:SummaryApi.updateUser.method,
                    credentials:"include",
                    headers:{
                        "content-type" : "application/json"
                    },
                    body:JSON.stringify({
                        userId:userId,
                        role:UserRole,
                    })
                })
                const dataApi = await dataResponse.json()
                if(dataApi.success){
                    toast.success("更新成功")
                    onClose()
                    callDF()
                }
                console.log("data api",dataApi)
                if(dataApi.error){
                    toast.error("用户更新失败")
            }
        }
    
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 opacity-50">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
        <button className="block ml-auto cursor-pointer" onClick={onClose}>
            <IoMdClose />
        </button>
        <h1 className="pb-4 text-lg font-medium">
            修改用户权限
        </h1>
        <p>名称:{name}</p>
        <p>邮箱:{email}</p>
         <div className="flex items-center justify-between">
            <p>权限</p>
            <select 
            className="border px-4 py-2"
            value={role} onChange={handleOnChangeSelect}>
                {
                    Object.values(ROLE).map(el => {
                        return(
                            <option value={el} key={el}> 
                                {el}
                            </option>
                        )
                    })
                }
            </select>
         </div>
         <button 
         onClick={updateUserRole}
         className="w-fit mt-2 mx-auto block py-2 px-3 rounded-full bg-green-600 text-white hover:bg-blue-700">
                修改用户权限
         </button>
      </div>
    </div>
  )
}

export default ChangeUserRole
