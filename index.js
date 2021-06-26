const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./routes/users');
const Auth = require('./routes/auth');
const config = require('config');
const Product = require('./routes/product');

mongoose.set('useFindAndModify', false);
app.use(express.json());
app.use('/api/register', User);
app.use('/api/auth', Auth);
app.use('/product', Product);
mongoose.connect(process.env.DB)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err))


const port = process.env.PORT || 4000;

app.listen(port, ()=>{
    console.log('App Running');
})
