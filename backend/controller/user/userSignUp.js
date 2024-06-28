
const userModel = require('../../models/userModel')
const bcrypt = require('bcryptjs')


async function userSignUpController(req, res) {
    try {
        const { email, password, username } = req.body

        const userExist = await userModel.findOne({ email })

        if (userExist) {
            throw new Error('User already exists')
        }

     
        if (!email) {
            throw new Error("Please provide email")
        }
        if (!password) {
            throw new Error("Please provide password")
        }
        if (!username) {
            throw new Error("Please provide name")
        }

        const salt = await bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hashSync(password, salt)

        if (!hashedPassword) {
            throw new Error('Password hashing failed')
        }

        const payLoad = {
            ...req.body,
            role: 'user',
            password: hashedPassword
        }

        const userData = new userModel(payLoad)

      
        const saveUser = await userData.save()

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: 'User created successfully'
        })

    } catch (error) {
        res.json({
            message: error.message,
            error: true,
            success: false,

        })
    }
}


module.exports = userSignUpController