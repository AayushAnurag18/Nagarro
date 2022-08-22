const express = require('express');
const { getProfile, getYourProfile } = require('../controllers/profile');
const router = express.Router();

router.get('/', getYourProfile);
router.get('/:userId', getProfile);

module.exports = router;