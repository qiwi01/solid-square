const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { addFavorite, getFavorites } = require('../controllers/users');

router.post('/favorites', auth, addFavorite);
router.get('/favorites', auth, getFavorites);

module.exports = router;