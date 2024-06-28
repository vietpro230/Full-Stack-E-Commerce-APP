import UploadProduct from "../components/UploadProduct";

const backend = 'http://localhost:8080'



const SummaryApi = {
    signUp :{
        url: `${backend}/api/signup`,
        method: 'POST',
    },

    signIn :{
        url: `${backend}/api/signin`,
        method: 'POST',
    },

    current_user : {
        url: `${backend}/api/user-details`,
        method: 'GET',
    },

    logOut : {
        url: `${backend}/api/logout`,
        method: 'GET',
    },

    allUser : {
        url: `${backend}/api/all-users`,
        method: 'GET',
    },
    updateUser : {
        url: `${backend}/api/update-user`,
        method: 'POST',
    },
    uploadProduct : {
        url: `${backend}/api/upload-product`,
        method: 'POST',
    },

    getProducts : {
        url: `${backend}/api/get-product`,
        method: 'GET',
    },

    updateProduct : {
        url: `${backend}/api/update-product`,
        method: 'POST',
    },
    categogyProduct : {
        url: `${backend}/api/get-categoryProduct`,
        method: 'GET',
    },
    categoryWiseProduct :{
        url: `${backend}/api/category-product`,
        method: 'POST',
    },

    productDetails: {
        url: `${backend}/api/product-details`,
        method: 'POST',

    },

    addToCart : {
        url: `${backend}/api/addtocart`,
        method: 'POST',
    },
   
    addToCartProductCount : {
        url : `${backend}/api/countAddToCartProduct`,
        method : 'GET'
    },

    addToCartProductView : {
        url : `${backend}/api/view-cart-product`,
        method : 'GET'
    },

    updateCartProduct : {
        url : `${backend}/api/update-cart-product`,
        method : 'POST'
    },
    deleteCartProduct : {
        url : `${backend}/api/delete-cart-product`,
        method : 'POST'
    },
    searchProduct : {
        url : `${backend}/api/search`,
        method : 'GET'
    },
    filterProduct : {
        url : `${backend}/api/filter-product`,
        method : 'POST'
    }
    
 

    
}


export default SummaryApi;