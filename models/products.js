const mongoose = require('mongoose');
const Joi = require('joi');

const productSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
    },
    price:{
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 10,
    },
    detail:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
    }

})

const productModel = mongoose.model('Products', productSchema);

function validateProduct (product){

    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        detail: Joi.string().min(5).max(100).required(),
        price: Joi.number().min(1).max(10).required()
    })

    const validate = schema.validate(product);
    return validate;

}

exports.validateProduct = validateProduct;
exports.productModel = productModel;