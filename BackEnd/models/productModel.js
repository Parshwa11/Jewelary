const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  colour: {
    type: String,
  },
  price: {
    type: Number,
  },
  gold_clarity : {
    type: Number
  },
  image: {
    type:String
  }
  
});

module.exports = mongoose.model("Product", productSchema);