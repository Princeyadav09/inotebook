const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/inotebook?directConnection=true"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error(error);
    });
}



module.exports = connectToMongo;