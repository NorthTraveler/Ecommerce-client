import ProductDetails from "@/components/Category/ProductDetails"
import { url } from "inspector"

const backDomain = "http://localhost:8000"

const SummaryApi = {
    signUP:{
        url:`${backDomain}/api/signup`,
        method:"post"
    },
    signIN:{
        url:`${backDomain}/api/signin`,
        method:"post"
    },
    currentUser:{
        url:`${backDomain}/api/user-details`,
        method:"get"
    },
    LogOut_user:{
        url:`${backDomain}/api/logout`,
        method:"get"
    },
    all_user:{
        url:`${backDomain}/api/all-user`,
        method:"get"
    },
    updateUser:{
        url:`${backDomain}/api/update-user`,
        method:"post"
    },
    all_product:{
        url:`${backDomain}/api/get-product`,
        method:"get"
    },
    uploadProduct:{
        url:`${backDomain}/api/upload-product`,
        method:"post"
    },
    updateProduct:{
        url:`${backDomain}/api/update-product`,
        method:"post"
    },
    getCategoryProduct:{
        url:`${backDomain}/api/get-categoryProduct`,
        method:"get"
    },
    getCategoryWiseProduct:{
        url:`${backDomain}/api/category-product`,
        method:"post"
    },
    ProductDetails:{
        url:`${backDomain}/api/product-details`,
        method:"post"
    },
    addToCart:{
        url:`${backDomain}/api/addtocart`,
        method:"post"
    },
    countAddToCartProduct:{
        url:`${backDomain}/api/countAddToCartProduct`,
        method:"get"
    },
    addToCartViewProduct:{
        url:`${backDomain}/api/view-cart-product`,
        method:"get"
    },
    updateCartProduct:{
        url:`${backDomain}/api/update-cart-product`,
        method:"post"
    },
    deletCartProduct:{
        url:`${backDomain}/api/delete-cart-product`,
        method:"post"
    },
    searchProduct:{
        url:`${backDomain}/api/search`,
        method:"get"
    },
    filterProduct:{
        url:`${backDomain}/api/filter-product`,
        method:"post"
    },
    payment:{
        url:`${backDomain}/api/checkout`,
        method:"post"
    }
    
}

export default SummaryApi   