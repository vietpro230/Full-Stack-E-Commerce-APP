
const uploadProductPermission = require('../../helpers/permission')
const productModel = require('../../models/productModel')


async function updateProductController(req,res){
    try{
        
        if(!uploadProductPermission(req.userId)){
            throw new Error("You don't have permission to upload product")
        }
      

             const { _id, ...resBody} = req.body

        const updateProduct = await productModel.findByIdAndUpdate(_id,resBody)
        res.status(200).json({
            message : "Product updated successfully",
            success : true,
            error : false,
            data : updateProduct
        })

    }
    catch(error){
        res.status(400).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

module.exports = updateProductController