const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const upload = require('../middlewares/upload');
const { getProperties, getProperty, addProperty, updateProperty, deleteProperty } = require('../controllers/properties');

router.get('/', getProperties);
router.get('/:id', getProperty);
router.post('/', auth, admin, upload.array('images', 12), addProperty);
router.put('/:id', auth, admin, upload.array('images', 12), updateProperty);
router.delete('/:id', auth, admin, deleteProperty);

module.exports = router;