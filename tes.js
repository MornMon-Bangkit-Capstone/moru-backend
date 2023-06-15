const multer = require('multer');
const express = require('express');
const multerGoogleStorage = require('multer-google-storage');
const app = express();
// Configure multer to handle file uploads
const upload = multer({dest: 'uploads/'});

app.post('/upload', uploadHandler.any(), function(req, res) {
  console.log(req.files);
  res.json(req.files);
});

app.listen(2000, (err) => {
  err ? console.log('Server Start Failed') : console.log('Server started');
});
