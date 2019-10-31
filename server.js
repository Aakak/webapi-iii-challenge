// const express = 'express';
const express = require('express');
const server = express();
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});


function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url}`
  );
   next();
};

server.use(express.json()); // built-in
server.use('/api/users', logger, userRouter)
server.use('/api/posts', logger, postRouter)

module.exports = server;
