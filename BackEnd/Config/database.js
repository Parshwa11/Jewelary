const mongoose = require("mongoose");

// const mongoConnectionString = process.env.mongo_URI;

const connectDB = () =>{
    mongoose
  .connect("mongodb+srv://parshwachokshi1:parshwachokshi1@cluster0.bjx9moh.mongodb.net/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => {
    // console.log("Connection With database has been Established", conn)
  }).catch((err) => {
        console.log("Some erroe Occured", err);
      });
  };


module.exports = connectDB
