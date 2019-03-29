'use strict';
const express = require('express');
const router = express.Router();



// @Route GET api/users/test
//@desc  Test users route
//@access Users
router.get('/test', (req, res) =>
    (res.json({
            message: 'Post Works'
        }


    ))
)

module.exports = router;