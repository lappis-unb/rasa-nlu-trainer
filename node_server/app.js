const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(index);
module.exports = app;
