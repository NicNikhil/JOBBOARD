import userModels from "../models/userModels.js";

export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body

        //validate 
        if (!name) {
            return res.status(400).send({ success: false, message: 'please provide name' })
        }
        if (!email) {
            return res.status(400).send({ success: false, message: 'please provide email' })
        }
        if (!password) {
            return res.status(400).send({ success: false, message: 'please provide password' })
        }
        const existingUser = await userModels.findOne({ email })
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'Email Already Register Please Login'
            })
        }

        const user = await userModels.create({ name, email, password })
        res.status(201).send({
            success: true,
            message: 'User Create Successfully',
            user,
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            massage: 'Error in register controller',
            success: false,
            error
        })
    }
};
