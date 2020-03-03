const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pokemons'); 
mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ',error);
    });

beforeEach((done) => {
    mongoose.connection.collections.pokemons.drop(() => {
         //this function runs after the drop is completed
        done(); //go ahead everything is done now.
    }); 
});

afterEach(async function () {
    const collections = await mongoose.connection.db.collections()
  
    for (let collection of collections) {
      await collection.remove()
    }
})

MyModel.collection.drop();