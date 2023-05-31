const express = require('express');
const authController= require('controllers/auth');
const fillRouter=require('./fill');
// eslint-disable-next-line new-cap
const router = express.Router();
router.post('/register', authController.register);
router.post('/login', authController.login);
router.use('/fill', fillRouter);
module.exports = router;
