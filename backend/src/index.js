const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const authMiddleware = require('./middlewares/authentication');
const userRoutes = require('./routes/user');
const churrascoRoutes = require('./routes/churrasco');
const participantRoutes = require('./routes/participant');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(authMiddleware)

//routes
app.use('/user', userRoutes);
app.use('/churrasco', churrascoRoutes);
app.use('/participant', participantRoutes);

//react app
app.use(express.static(path.join(__dirname, "../../frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/build/index.html"));
});

//db
mongoose
    .connect(
        process.env.DB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            'useCreateIndex': true
        }
    ).then(() => {
        console.log('Connected with MongoDBCloud.');

        app.listen(process.env.PORT || 8000, () => {
            console.log('The server is up and running.');
        });
    }).catch(err => {
        console.log(err);
    });

module.exports = app;