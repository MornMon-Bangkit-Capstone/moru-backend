const express = require('express');
const authController= require('controllers/auth');
// eslint-disable-next-line new-cap
const router = express.Router();
router.post('/register', authController.register);
router.post('/login', authController.login);
module.exports = router;
