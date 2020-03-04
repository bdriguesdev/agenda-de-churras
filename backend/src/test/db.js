const mongoose = require('mongoose');
require('dotenv').config();

before(done => {
    mongoose.connect(
        process.env.DB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            'useCreateIndex': true
        }
    ).then(async () => {
        const collections = await mongoose.connection.db.collections()

        for (let collection of collections) {
            await collection.deleteOne();
        }
        done();
    })

});