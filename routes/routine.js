const express = require('express');
const routineController = require('controllers/routine');
// eslint-disable-next-line new-cap
const router = express.Router();
router.get('/books', routineController.book);
router.get('/books/:id', routineController.bookDetail);
router.get('/exercises', routineController.exercise);
router.get('/exercises/:id', routineController.exerciseDetail);
module.exports = router;
