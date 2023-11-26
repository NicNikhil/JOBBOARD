import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
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
            minlength: [6, 'password length should be greater than 6 character'],
        },

        location: {
            type: String,
            default: "India",
        },
    },
    { timestamps: true });

//middlewares
userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
});

//JSON WEBTOKEN
userSchema.methods.createJwt = function () {
    return Jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: 'id' });
}

export default mongoose.model('USER', userSchema);