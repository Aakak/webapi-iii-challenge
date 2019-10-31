// const express = 'express';
const express = require('express');
const router = express.Router();

const Users = require('./userDb');
const Posts = require('../posts/postDb');

router.post('/', validateUser, (req, res) => {
    let user = req.body;
    Users.insert(user).then(user => {
        res.status(200).json(user);
    }).catch(error => {
        res.status(500)
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
    Users.getUserPosts(req.user.id)
    .then(posts => {
        res.status(200).json(posts)
    }).catch(error => {
        res.status(500)
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    console.log("POST!")
    let post = req.body
    post.user_id = req.user.id
    Posts.insert(post).then(p => {
            res.status(200).json(p)
        }
        ).catch(error => {
            res.status(500)
        })
});

router.get('/', (req, res) => {
    Users.get()
    .then(users => {
        res.status(200).json(users)
    })
});

router.get('/:id', validateUserId, (req, res) => {
    res.status(200).json(req.user);
});

router.delete('/:id', validateUserId, (req, res) => {
    Users.remove(req.user.id)
    .then(id =>  {
        res.status(200).json(req.user);
    }).catch(error =>
        {
            res.status(500);
        })
});

router.put('/:id', validateUserId, (req, res) => {
    Users.update(req.body)
    .then(id =>  {
        res.status(200).json(id);
    }).catch(error =>
        {
            res.status(500);
        })
});

//custom middleware

function validateUserId(req, res, next) {
    let userId = req.params.id;
    Users.getById(userId)
    .then(user => {
        req.user = user;
        if (user === undefined) {
            res.status(400).json({ message: "invalid user id" });
        } else {
            next();
        }
        
    }).catch(error => {
        res.status(400).json({ message: "invalid user id" });
    })
};

function validateUser(req, res, next) {
    if (req.body === undefined) {
        res.status(400).json({ message: "missing user data" })
    } else  if (req.body.name === undefined) {
        res.status(400).json({ message: "missing required name field" });
    } else {
        next();
    }
};

function validatePost(req, res, next) {
    if (req.body === undefined) {
        res.status(400).json({ message: "missing post data" })
    } else  if (req.body.text === undefined) {
        res.status(400).json({ message: "missing required text field" });
    } else {
        next();
    }
};

module.exports = router;
