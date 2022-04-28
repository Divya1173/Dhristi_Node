/**
* Code: Divya Mohan 
* Date: 28-4-2022 
* Base file for the project.
**/
const express = require('express');

const app = express();

const newWordsRoute = require('./api/routes/new_word');

app.use('/api', newWordsRoute);

module.exports = app;
