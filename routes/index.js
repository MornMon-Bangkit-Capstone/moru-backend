const express = require('express');
const authRouter=require('./auth');
const routineRouter=require('./routine');
const profileRouter = require('./profile');
const scheduleRouter=require('./schedule');
const databaseRouter=require('./database');
const recomRouter=require('./recom');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', sayHi);
router.use('/profile', profileRouter);
router.use('/auth', authRouter);
router.use('/routine', routineRouter);
router.use('/schedule', scheduleRouter);
router.use('/database', databaseRouter);
router.use('/recommendation', recomRouter);
module.exports = router;

function sayHi(req, res) {
  return res.status(201).json({
    error: false,
    message: 'Welcome to dummy API',
  });
}
