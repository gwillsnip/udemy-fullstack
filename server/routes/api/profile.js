//fetch and create the users details (location, bio, education, social network links)'use strict';
const express = require('express');
const router = express.Router();


// @Route GET api/profile/test
//@desc  Test profile route
//@access Public
router.get('/test', (req, res) =>
    (res.json({
            message: 'Profile Works'
        }


    ))
)

module.exports = router;