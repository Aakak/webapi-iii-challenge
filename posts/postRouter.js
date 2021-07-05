// const express = 'express';
const express = require('express');
const Posts = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
    Posts.get()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json({
            message: 'Error getting posts',
        });
    });
    
});

router.get('/:id', validatePostId, (req, res) => {
    res.status(200).json(req.post);
});

router.delete('/:id', validatePostId, (req, res) => {
    Posts.delete(req.post.id)
    .then(id => {
        res.status(200).json(post);
    }).catch(error => {
        res.status(500).json({
            message: 'Error deleting post',
        });
    })

});

router.put('/:id', validatePostId, (req, res) => {
    Posts.update(req.post)
    .then(post => res.status(200).json(post))
    .catch(error => {
        res.status(500).json({
            message: 'Error deleting post',
        });
    });

});

// custom middleware

function validatePostId(req, res, next) {
    let postId = req.params.id;
    Posts.getById(postId)
    .then(post => {
        req.post = post;
        if (post === undefined) {
            res.status(400).json({ message: "invalid post id" });
        } else {
            next();
        }
        
    }).catch(error => {
        res.status(400).json({ message: "invalid post id" });
    })
};

module.exports = router;