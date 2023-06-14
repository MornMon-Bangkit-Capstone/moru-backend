require('dotenv').config();
require('rootpath')();

const express = require('express');
const fileUpload = require('express-fileupload');
const routes = require('routes/index');

const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const host= process.env. HOST || '0.0.0.0';
const app = express();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({extended: false}));
// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());
app.use(
    fileUpload({
      limits: {
        fileSize: 10000000,
      },
      abortOnLimit: true,
    }),
);
app.use('/', routes);


// Start the server
app.listen(port, host);
// tes
