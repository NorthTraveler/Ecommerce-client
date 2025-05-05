"use client"
import ProductDetails from "@/components/Category/ProductDetails"

export default async function Page({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const { slug } = await params
    console.log("data",slug)
    return <ProductDetails />
  }