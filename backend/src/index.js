const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

//routes


//db
mongoose
    .connect(
        process.env.DB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then(() => {
        console.log('Connected with MongoDBCloud.');

        app.listen(process.env.SERVER_PORT, () => {
            console.log('The server is up and running.');
        });
    }).catch(err => {
        console.log(err);
    });