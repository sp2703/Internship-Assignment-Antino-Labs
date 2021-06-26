const Joi = require('joi');
const mongoose = require('mongoose');


function authValidate (authUser)
{
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    })

    

    return schema.validate(authUser);

}

exports.authValidate = authValidate