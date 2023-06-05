const express = require('express');
const scheduleController = require('controllers/schedule');
const {authenticateToken} = require('../middleware/auth');
// eslint-disable-next-line new-cap
const router = express.Router();
router.get('/', authenticateToken, scheduleController.getAllSchedule);
router.get('/:id', authenticateToken, scheduleController.getScheduleDetail);
router.post('/', authenticateToken, scheduleController.postSchedule);
router.put('/:id', authenticateToken, scheduleController.editScheduleDetail);
router.delete('/:id', authenticateToken, scheduleController.deleteSchedule);
module.exports = router;
