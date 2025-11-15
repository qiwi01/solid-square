const express = require('express');
const router = express.Router();
const { getAgents, getAgent } = require('../controllers/agents');

router.get('/', getAgents);
router.get('/:id', getAgent);

module.exports = router;