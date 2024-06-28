const uploadProductPermission = require('../../helpers/permission')
const productModel = require('../../models/productModel')


async function UploadProductController(req, res){
    try {

        const sessionUserId = req.userId
        
        if(!uploadProductPermission(sessionUserId)){
            throw new Error("You don't have permission to upload product")
        }

        const uploadProduct = new productModel(req.body)
        const saveProduct = await uploadProduct.save()
        res.status(201).json(
            {
                message : "Product uploaded successfully",
                success : true,
                error : false,
                data : saveProduct
            }
        )
    
    }
    catch(error){
        res.status(400).json(
            {
                message : error.message || error,
                error : true,
                success : false
            }
        )
    }
}

module.exports = UploadProductController