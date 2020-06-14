const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRouter = require('./routes/user-router');

const app = express();
const apiPort = 5000;


const fs = require('fs');
const directory = './Uploads';
const path = require('path');

// delete the uploads folder

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());


app.use('/api/', userRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));



