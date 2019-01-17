const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
mongoose.connect('mongodb://localhost:3091');

//App Setuup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type:'*/*'}));
router(app);


//Server Setup

const port = process.env.PORT || 3090;
const server = http.createServer(app);


server.listen(port, () => {
    console.log("Server listening on port", port);
})