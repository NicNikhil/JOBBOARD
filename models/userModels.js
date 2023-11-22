import mongoose from "mongoose";
import validator from "validator";
//schema 

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is require'],
        },
        lastName: {
            type: String,
        },

        email: {
            type: String,
            required: [true, 'Email is require'],
            unique: true,
            validate: validator.isEmail,
        },
        password: {
            type: String,
            required: [true, 'password is require'],
            password: [6, 'password length should be greater than 6 character'],
        },

        location: {
            type: String,
            default: "India",
        },
    },
    { timestamps: true })

export default mongoose.model('USER', userSchema);