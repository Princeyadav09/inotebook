const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://princeyadav09:yadav@cluster0.ozvdgx9.mongodb.net/"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI)
    .then((res) => {
      console.log('Connected to MongoDB',res.connection.host);
    })
    .catch((error) => {
      console.error(error);
    });
}



module.exports = connectToMongo;