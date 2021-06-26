const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email:
    {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        maxlength: 1024,
        minlength: 8,
    },
    role: {
        type: String,
        maxlength: 5,
        minlength: 4
    }
})

userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({id: this._id, role: this.role}, process.env.jwtKey);
    return token;
}

const User = mongoose.model('User', userSchema);

function UserValidate (user)
{
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        role: Joi.string().min(4).max(5)
    })



    return schema.validate(user);

}

exports.User = User;
exports.UserValidate = UserValidate;
