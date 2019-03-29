//fetch and create the users details (location, bio, education, social network links)'use strict';
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const passport = require('passport');


//Load Profile model
const Profile = require('../../models/Profile')
    //load User Profile
const User = require('../../models/User');



// @Route GET api/profile/test
//@desc  Test profile route
//@access Public
router.get('/test', (req, res) => (res.json({ message: 'Profile Works' })));

// @Route GET api/profile
//@desc  Get current users profile
//@access Private
router.get('/profile', passport.authenticate('jwt', { session: false }, (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no Profile for this user'
                return res.status(400).json(errors)
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err))

}));
module.exports = router;