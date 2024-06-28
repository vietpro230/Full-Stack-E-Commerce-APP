const userModel = require("../models/userModel")

const uploadProductPermission = async(userId) => {
    const user = await userModel.findById(userId)
    console.log(user)

    if(user.role === 'ADMIN'){
        return true
    }

    return false
}


module.exports = uploadProductPermission