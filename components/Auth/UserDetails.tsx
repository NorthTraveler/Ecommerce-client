import SummaryApi from '@/app/api'
import { setUserDetails } from '@/store/userSlice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function UserDetails() {
  const dispatch = useDispatch()
  const fetchUserDetails = async() => {
    const dataResponse = await fetch(SummaryApi.currentUser.url,{
      credentials:"include",
    })
    const dataApi = dataResponse.json()
    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }

    // console.log("dataApi",dataResponse)
  }
  useEffect(() => {
      fetchUserDetails()
  })

  return (
    <div>UserDetails</div>
  )
}
