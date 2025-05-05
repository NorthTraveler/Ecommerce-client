'use client'
import Image from 'next/image'
import React from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'

export default function AdminPanel() {
    const dispatch = useDispatch()
    const user = useSelector(state => state?.user?.user)
  return (
    <></>
  )
}
