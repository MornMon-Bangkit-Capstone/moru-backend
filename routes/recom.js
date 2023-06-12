const express = require('express');
const recomController = require('controllers/recom');
const {authenticateToken} = require('../middleware/auth');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/books', authenticateToken, recomController.bookRecom);
router.get('/exercises', authenticateToken, recomController.exerciseRecom);

module.exports = router;
