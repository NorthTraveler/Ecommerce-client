'use client'
import BannerProduct from "@/components/Category/BannerProduct";
import CategoryList from "@/components/Category/CategoryList";
import HorizontalCardProduct from "@/components/Category/HorizontalCardProduct";
import VerticalCardProduct from "@/components/Category/VerticalCardProduct";


export default function Home() {
  return (
    <div>
        <CategoryList />
        <BannerProduct />
        <HorizontalCardProduct category={'airpods'} heading={'苹果耳机'}/>
        <HorizontalCardProduct category={'mobiles'} heading={'手机'}/>
        <HorizontalCardProduct category={'camera'} heading={'相机'}/>
        <VerticalCardProduct category={'airpods'} heading={'苹果耳机'}/>
        <VerticalCardProduct category={'refrigerator'} heading={'冰箱'}/>
        <VerticalCardProduct category={'televsions'} heading={'电视'}/>
        <VerticalCardProduct category={'camera'} heading={'相机'}/>
    </div>
  );
}
