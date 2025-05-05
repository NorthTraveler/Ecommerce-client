import React from 'react'
import dotenv from 'dotenv';

export default function page() {
    dotenv.config();
    const test = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
    console.log("test",test)
  return (
    <div></div>
  )
}
