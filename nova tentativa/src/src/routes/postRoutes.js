const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

router.get('/api/posts', postController.getAllPosts);

router.get('/api/posts/:id', postController.getPostById);

router.post('/api/posts', postController.createPost);

router.put('/api/posts/:id', postController.updatePost);

router.delete('/api/posts/:id', postController.deletePost);

module.exports = router;
