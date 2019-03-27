'use strict';
const express = require('express');
const mongoose = require('mongoose');


const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const post = require('./routes/api/post');



const app = express();


//DB config
const db = require('./config/keys').mongoURI




//connect to MongoDB
mongoose.connect(db)
    .then(() => console.log('Mongodb is connected'))
    .catch(err => console.log(err, 'there was an error'))


app.get('/', (req, res) => res.send('hello '));

//Use Routes 
app.use('/api/users', users);
app.use('/api/post', post);
app.use('/api/profile', profile);


const port = process.env.PORT || 5000;

app.listen(port, () => (console.log(` server running ${port}`)));