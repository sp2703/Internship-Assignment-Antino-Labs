const express = require('express');
const router = express.Router();
const {validateProduct, productModel} = require('../models/products');
const auth = require('../middlewares/tokenAuth');
const _ = require('lodash');

router.use(express.json())
router.get('/list', async (req,res)=>{

    const products = await productModel.find();
    res.send(products);

})

router.post('/add', auth, async (req,res)=>{
    const { error } = validateProduct(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const products = new productModel({
        name: req.body.name,
        price: req.body.price,
        detail: req.body.detail,

    })

    const product = await products.save();
    res.send(product);
})

router.get('/:id', async (req, res)=>{
    const product = await  productModel.findById(req.params.id);
    if(!product) return res.status(400).send("Product not found");

    res.send(product);
})

router.delete('/delete/:id', auth, async (req,res)=>{
    let product = await productModel.findById(req.params.id);
    if(!product) return res.status(400).send("Product not found");

    product = await productModel.findByIdAndDelete(req.params.id)
    res.send(product);
})

router.put('/update/:id', auth, async (req, res)=>{
    let product = await productModel.findById(req.params.id);
    if(!product) return res.status(400).send("Product not found");

    const detail = product.detail
    if(req.body.name) product.name = req.body.name
    if(req.body.price) {product.price = req.body.price}
    else {product.price=product.price}

    if(req.body.detail) {product.detail = req.body.detail}
    else {product.detail=product.detail}
    await product.save();
    res.send(product);
})

module.exports = router;