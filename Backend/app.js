//npm install --save express
//npm install --save body-parser
//npm install --save mongoose

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const xss = require('xss-clean');

//Routes
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(xss());

//CORS Error - allow all requests from all origins to access the API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/api/posts', postRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/admi', adminRoutes);

module.exports = app;

