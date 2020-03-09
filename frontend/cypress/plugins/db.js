const mongoose = require('mongoose');
require('dotenv').config();

const cleanDb = async () => {
    await mongoose.connect(
        process.env.REACT_APP_DB_URI,
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
        
    })
};

module.exports = cleanDb;