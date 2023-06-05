const express = require('express');
const authRouter=require('./auth');
const routineRouter=require('./routine');
const scheduleRouter=require('./schedule');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', sayHi);
router.use('/auth', authRouter);
router.use('/routine', routineRouter);
router.use('/schedule', scheduleRouter);
module.exports = router;

function sayHi(req, res) {
  return res.status(201).json({
    error: false,
    message: 'Welcome to dummy API',
  });
}
