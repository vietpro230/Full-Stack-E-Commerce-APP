const addToCartModel = require("../../models/cartProduct")

const addToCartController = async (req, res) => {
    try {
        const { productId } = req?.body
        const currentUser = req?.userId
        console.log("currentUser", currentUser);    
        const isProductAvailable = await addToCartModel.findOne({ productId })

        if (isProductAvailable) {
            return res.json({
                message: "Already exits in add to cart",
                error: true,
                success: false
            
            })
        }


        const payload = {
            productId,
            quantity: 1,
            userId: currentUser
        }


        const newAddToCart = new addToCartModel(payload)
        const saveProduct = await newAddToCart.save()

        return res.json({
            data : saveProduct,
            message : "Product Added in Cart",
            success : true,
            error : false
        })
    }
    catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        })
    }
}



module.exports = addToCartController