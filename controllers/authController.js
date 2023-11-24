import userModels from "../models/userModels.js";

export const registerController = async (req, res, next) => {
    const { name, email, password } = req.body

    //validate 
    if (!name) {
        next('name is required');
    }
    if (!email) {
        next('email is required');
    }
    if (!password) {
        next('password is required and greater than 6 character');
    }
    const existingUser = await userModels.findOne({ email })
    if (existingUser) {
        next('Email Already Register Please Login');
    }

    const user = await userModels.create({ name, email, password })
    res.status(201).send({
        success: true,
        message: 'User Create Successfully',
        user,
    })


};
