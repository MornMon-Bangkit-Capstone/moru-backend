const express = require('express');
const fillController = require('controllers/fill');
const {authenticateToken} = require('middleware/auth');
// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/data', authenticateToken, fillController.editFillDetail);
// eslint-disable-next-line max-len
router.post('/image', authenticateToken, fillController.uploadImage);

module.exports = router;

