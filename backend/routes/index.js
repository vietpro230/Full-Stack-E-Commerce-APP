const express = require('express');

const router = express.Router();




const userSignUp = require('../controller/user/userSignUp');
const userSignIn = require('../controller/user/userSignIn');
const userDetails= require('../controller/user/userDetails');
const authToken = require('../middleware/authToken');
const userLogout = require('../controller/user/userLogout');
const allUsers = require('../controller/user/allUser');
const updateUser = require('../controller/user/updateUser');
const uploadProduct = require('../controller/product/uploadProduct');
const getProduct = require('../controller/product/getProduct');
const updateProductController = require('../controller/product/updateProduct');
const getCategoryProductOne = require('../controller/product/getCategoryProductOne');
const getCateGoryWiseProduct = require('../controller/product/getCategoryWiseProduct');
const getProductDetails = require('../controller/product/getProductDetails');
const addToCartController = require('../controller/user/addToCartController');
const countAddToCardProduct = require('../controller/user/countAddToCardProduct');
const addToCartViewProduct = require('../controller/user/addToCartViewProduct');
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct');
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct');
const searchProduct = require('../controller/product/searchProduct');
const filterProductController = require('../controller/product/filterProduct');

router.post('/signup', userSignUp)
router.post('/signin', userSignIn)
router.get('/user-details', authToken, userDetails)
router.get('/logout', userLogout)

//admin
router.get('/all-users',authToken, allUsers)
router.post('/update-user',authToken, updateUser)
// product
router.post('/upload-product',authToken, uploadProduct)
router.get('/get-product', getProduct)
router.post('/update-product',authToken,updateProductController)
router.get('/get-categoryProduct', getCategoryProductOne)
router.post('/category-product', getCateGoryWiseProduct)
router.post('/product-details', getProductDetails)
router.get('/search',searchProduct)
router.post('/filter-product', filterProductController)
// user add to cart

router.post('/addtocart', authToken,addToCartController)
router.get("/countAddToCartProduct", authToken,countAddToCardProduct)
router.get("/view-cart-product", authToken, addToCartViewProduct)
router.post("/update-cart-product", authToken, updateAddToCartProduct)
router.post("/delete-cart-product", authToken, deleteAddToCartProduct)

module.exports = router;