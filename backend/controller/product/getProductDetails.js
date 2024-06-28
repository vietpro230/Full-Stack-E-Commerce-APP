const productModel = require("../../models/productModel")

const getProductDetails = async(req, res) => {
    try {
        const { productID } = req.body

        const product = await productModel.findById(productID)


        res.json({
            data : product,
            message: "OK",
            success: true,
            error: false
        })



    }
    catch(err){
         res.json({
            message: err.message || err,
            error: true,
            success: false  
        })
    }

}

module.exports = getProductDetails