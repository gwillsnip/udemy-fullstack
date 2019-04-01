'use strict';
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongod = require('./config/keys')
const passport = require('passport')


//API path
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const post = require('./routes/api/post');

// Instantiate application
const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB cconnection
const db = mongoose.connect(mongod.mongoURI, { useNewUrlParser: true })
    .then(db => {
        console.log('connected to Mongodb')

    })
    .catch(err => err.message)

//Passport middleware
app.use(passport.initialize())

//Passport Config
require('./config/passport')(passport);

//Use Routes 
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/post', post);


const port = process.env.PORT || 5000;

app.listen(port, () => (console.log(` server running on port ${port}`)));