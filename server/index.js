const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db');
const userRouter = require('./routes/user-router');

// const https = require('https');
// const fs = require('fs');

const app = express();
const apiPort = 5000;


const fs = require('fs');
const directory = './Uploads';
const path = require('path');

// delete the uploads folder

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());


db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/api/', userRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));



