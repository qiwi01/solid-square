const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const { getAnalytics } = require('../controllers/analytics');

router.get('/', auth, admin, getAnalytics);

module.exports = router;