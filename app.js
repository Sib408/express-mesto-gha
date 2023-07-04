const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');

const errorHandler = require('./middlewars/errorHandler');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(router);
app.use(errorHandler);

app.listen(PORT);
