const mongoose = require('mongoose');
require('dotenv').config();
const connectionParams = {

};

const uri = "mongodb+srv://AdminPrecieux:"+ process.env.MONGO_PASSWORD +"@amisprecieux.aik1jxt.mongodb.net/?retryWrites=true&w=majority";
const connection = mongoose.connect(uri, connectionParams).then(() => console.log('connected')).catch((err) => console.log(err));

module.exports = connection;
