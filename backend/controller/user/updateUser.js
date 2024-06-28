const userModel = require('../../models/userModel')

async function updateUser(req, res) {
    try{

        const sessionUser = req.userId
      

        const { id, email, name, role } = req.body
  
        const payload = {
            ...( email && { email : email}),
            ...( name && { name : name}),
            ...( role && { role : role}),
        }

        const user = await userModel.findById(sessionUser)
        console.log("user",user.role)


        const updateUser = await userModel.findOneAndUpdate( id , payload)
        console.log("update", updateUser.role)
        res.json({
            data : updateUser,
            message: "User updated",
            success: true,
            error: false,
        })


    }
    catch(err){
        res.status(400).json({
            error: err.message,
            message : err.message || err,
            success : false
        })
    }
}

module.exports = updateUser 