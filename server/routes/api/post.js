const mongoose = require('mongoose');
const passport = require('passport');
const express = require('express');
const router = express.Router();


// import Model
const Post = require('../../models/Post');
const Profile = require('../../models/Profile')

//import Validation
const validatePostInput = require('../../validation/post');


// @Route GET api/posts
//@desc  Get Posts
//@access Public
router.get('/', (req, res) => {
    const errors = {};

    Post.find()
        .sort({ date: -1 })
        .then(posts => { res.json(posts) })
        .catch(err => res.status(404).json({ nopostfound: 'there is no available posts' }));
});

// @Route GET api/posts/:id
//@desc  Get Posts
//@access Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err =>
            res.status(404).json({
                nopostfound: 'No post found with that ID'
            })
        );
});

// @Route GET api/posts
//@desc  Create Post
//@access private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { errors, isValid } = validatePostInput(req.body);
    //Check Validation
    if (!isValid) {
        //if any errors send a 400 message
        return res.status(400).json(errors);
    }
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });
    newPost.save().then(post => res.json(post)).catch(err => res.status(404).json({ nonewpost: 'Post can not be saved' }));
})


// @Route GET api/posts /:id
//@desc  Delete Id
//@access private
router.post(
    '/like/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (
                        post.likes.filter(like => like.user.toString() === req.user.id)
                        .length > 0
                    ) {
                        return res
                            .status(400)
                            .json({ alreadyliked: 'User already liked this post' });
                    }

                    // Add user id to likes array
                    post.likes.unshift({ user: req.user.id });

                    post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
        });
    }
);

// @Route Post api/posts /like/:id
//@desc   Like Id
//@access private
router.post('/like/:id', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    // Check if the id has been liked
                    if (
                        post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({ alreadyLiked: 'user already like this post' })
                    }
                    //add user to the like array
                    post.likes.unshift({ user: eq.user.id });
                    post.save().then(post => res.json(post))

                })
                .catch(err => res.status(404).json({ postnotfound: 'No post found with that ID' }));
        });
    }
);


// @Route GET api/posts /:id
//@desc  Delete Id
//@access private
router.post(
    '/like/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (
                        post.likes.filter(like => like.user.toString() === req.user.id)
                        .length > 0
                    ) {
                        return res
                            .status(400)
                            .json({ alreadyliked: 'User already liked this post' });
                    }
                    // Add user id to likes array
                    post.likes.unshift({ user: req.user.id });

                    post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
        });
    }
);

// @Route Post api/posts /unlike/:id
//@desc   unLike Id
//@access private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    // Check if the id has been liked
                    if (
                        post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                        return res.status(400).json({ notLiked: 'You have not like this post' })
                    }
                    //get removed Index
                    const getRemovedIndex = post.likes
                        .map(item => item.user.toString())
                        .indexOf(req.user.id)
                        //splice out of array
                    post.likes.splice(getRemovedIndex, 1)
                    post.save().then(post => res.json(post))

                })
                .catch(err => res.status(404).json({ postnotfound: 'No post found with that ID' }));
        });
    }
);


module.exports = router;