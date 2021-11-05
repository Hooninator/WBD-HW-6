const mongoose = require("mongoose");


const MONGOURI = "mongodb+srv://jb:Password@cluster0.yapgu.mongodb.net/Cluster0?retryWrites=true&w=majority"

const InitiateMongoServer = async () => {
    try {
      await mongoose.connect(MONGOURI, {
        useNewUrlParser: true
      });
      console.log("Connected to DB !!");
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  
  module.exports = InitiateMongoServer;