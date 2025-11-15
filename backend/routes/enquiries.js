const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const { createEnquiry, getEnquiries, replyEnquiry } = require('../controllers/enquiries');

router.post('/', auth, createEnquiry);
router.get('/', auth, getEnquiries);
router.post('/:id/reply', auth, admin, replyEnquiry);

module.exports = router;