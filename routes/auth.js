const express = require('express');
const {authValidate} = require('../models/auth');
const {User} = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const config = require('config');
const router = express.Router();

router.post('/', async (req,res)=>{

    const {error}  = authValidate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email});
    if(!user) return res.status(400).send('Inavlid Email or Password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Inavlid Email or Password');
    
    const token  = user.generateAuthToken();
    res.send(token);
})

module.exports = router;