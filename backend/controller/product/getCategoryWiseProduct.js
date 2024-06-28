const productModel = require("../../models/productModel")

const getCateGoryWiseProduct = async (req, res) => {
    try {
        const {category} = req?.body || req?.query
        const product = await productModel.find({category})

        res.json({
            data: product,
            success: true,
            error : false
        })

    }
    catch(err){
        res.status(400).json({
            message: err.message,
            error : true,
            success : false
        })

    }
}


module.exports = getCateGoryWiseProduct