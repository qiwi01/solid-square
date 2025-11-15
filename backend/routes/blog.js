const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const {
  getPosts, getPost, createPost, updatePost, deletePost
} = require('../controllers/blog');

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', auth, admin, createPost);
router.put('/:id', auth, admin, updatePost);
router.delete('/:id', auth, admin, deletePost);

module.exports = router;