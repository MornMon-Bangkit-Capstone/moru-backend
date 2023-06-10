const express = require('express');
const scheduleController = require('controllers/schedule');
const {authenticateToken, checkValidity} = require('../middleware/auth');
// eslint-disable-next-line new-cap
const router = express.Router();
router.get('/', authenticateToken, scheduleController.getAllSchedule);
router.get('/:id', authenticateToken,
    checkValidity('schedule'),
    scheduleController.getScheduleDetail);
router.post('/', authenticateToken, scheduleController.postSchedule);
router.put('/:id', authenticateToken,
    checkValidity('schedule'),
    scheduleController.editScheduleDetail);
router.delete('/:id', authenticateToken,
    checkValidity('schedule'),
    scheduleController.deleteSchedule);
module.exports = router;
