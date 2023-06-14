const express = require('express');
const profileController = require('controllers/profile');
const {authenticateToken} = require('../middleware/auth');
// eslint-disable-next-line new-cap
const router = express.Router();
router.get('/', authenticateToken, profileController.userbyID);
module.exports = router;
