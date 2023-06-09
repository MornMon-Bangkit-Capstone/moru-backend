const express = require('express');
const routineController = require('controllers/routine');
const {authenticateToken} = require('../middleware/auth');
// eslint-disable-next-line new-cap
const router = express.Router();
router.get('/books', authenticateToken, routineController.book);
router.post('/books', authenticateToken, routineController.bookPost);
router.get('/books/:id/:isPublic', routineController.bookDetail);
router.get('/exercises', authenticateToken, routineController.exercise);
router.post('/exercises', authenticateToken, routineController.exercisePost);
router.get('/exercises/:id/:isPublic', routineController.exerciseDetail);
module.exports = router;
