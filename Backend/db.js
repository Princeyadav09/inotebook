const mongoose = require('mongoose');


const connectToMongo = ()=>{
    mongoose.connect(process.env.URI)
    .then((res) => {
      console.log('Connected to MongoDB',res.connection.host);
    })
    .catch((error) => {
      console.error(error);
    });
}



module.exports = connectToMongo;