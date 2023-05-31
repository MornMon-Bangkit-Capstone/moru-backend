const express = require('express');
const routineController= require('controllers/routine');
// eslint-disable-next-line new-cap
const router = express.Router();
router.get('/books', routineController.book);
router.get('/exercises', routineController.exercise);
module.exports = router;
