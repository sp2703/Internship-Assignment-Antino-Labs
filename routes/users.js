const {User, UserValidate} = require('../models/user');
const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

router.use(express.json());

router.post('/', async (req, res)=>{
     const { error } = UserValidate(req.body);
     if(error) return res.status(400).send(error.details[0].message);

     let user = await User.findOne({email: req.body.email});
     if(user) return res.status(400).send('User already exists');
    
     const salt = await bcrypt.genSalt(10);
     req.body.password = await bcrypt.hash(req.body.password, salt);
     user = new User ({
         name: req.body.name,
         email: req.body.email,
         password: req.body.password,
         role: req.body.role === 'Admin' ? req.body.role : 'User'
     })

     await user.save();
     const token  = user.generateAuthToken();
     res.header('x-auth-token', token).send(_.pick(user, ['_id', 'email', 'name']));



})

module.exports = router;