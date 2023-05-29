require('dotenv').config();
require('rootpath')();

const express = require('express');
const routes = require('routes/index');

const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const app = express();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({extended: false}));
// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

app.use('/', routes);


// Start the server
app.listen(port, '0.0.0.0');
