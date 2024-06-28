
const products = require('../../models/productModel')
const getProductController = async (req, res) => {
    try {
        const allProduct = await products.find().sort({ createdAt: -1 })
        res.status(200).json({
            message: "All products",
            success: true,
            error: false,
            data: allProduct
        })
    }
    catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = getProductController