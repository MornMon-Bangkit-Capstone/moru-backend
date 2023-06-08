const express = require('express');
const databaseController = require('controllers/database');

// eslint-disable-next-line new-cap
const router = express.Router();
router.get('/title', databaseController.getTitle);
router.get('/rating', databaseController.getRating);
router.post('/query', databaseController.customQuery);
module.exports = router;
