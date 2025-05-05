"use client"

import { ToastContainer } from "react-toastify";
import 'react-toastify'
import "./globals.css";
import { useEffect, useState } from "react";
import SummaryApi from "./api";
import Context from "@/context";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/store/store";
import { setUserDetails } from "@/store/userSlice";
import { Header } from "@/components/Home/Header";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [CartProductCount,setCartProductCount] = useState(0)
  const fetchUserDetails = async() => {
    const dataResponse = await fetch(SummaryApi.currentUser.url,{
      method:SummaryApi.currentUser.method,
      credentials:"include",
    })
    const dataApi = await dataResponse.json()
    if(dataApi.success){
      store.dispatch(setUserDetails(dataApi.data));
      // console.log("dataApi success")
    }
    // console.log("dataApi",dataResponse)
  }
  const fetchUserAddToCart = async() => {
    const dataResponse = await fetch(SummaryApi.countAddToCartProduct.url,{
      method:SummaryApi.countAddToCartProduct.method,
      credentials:"include"
    })
    const dataApi = await dataResponse.json()
    setCartProductCount(dataApi?.data?.count)
  }
  
  useEffect(() => {
      fetchUserDetails()
      CartProductCount
      fetchUserAddToCart()
  },[])

  return (
    <html lang="en">
      <body className={``}>
        <Provider store={store}>
          <Context.Provider value={{fetchUserDetails,CartProductCount,fetchUserAddToCart}}>
          <Header />
          <main className="pt-16">
            {children}
          </main>
          <ToastContainer />
          </Context.Provider>
        </Provider>
      </body>
    </html>
  );
}
