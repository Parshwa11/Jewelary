const Product = require("../models/productModel");

exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

exports.getAllProducts = async (req, res, next) => {
  Product.find((err, response) => {
    res.json(response);
  });
};

exports.getProductDetails = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json({
    success: true,
    product,
  });
};

const modifyPrice = (data, originalData) => {
  let price
  switch (data.gold_clarity) {
    case "18":
    price = checkForColour(data,originalData)
      return { ...data, price: price + 1000 };
    case "20":
    price = checkForColour(data,originalData)
      return { ...data, price: price + 2000 };
    case "24":
    price = checkForColour(data,originalData)
      return { ...data, price: price + 3000 };
    default:
    price = checkForColour(data,originalData)
      return { ...data, price: originalData.price };
  }
};

const checkForColour = (data,originalData) =>{
  if(data.colour === "White Gold"){
    return  originalData.price - 400
  }else{
    return  originalData.price 
  }
}

exports.filterPrice = async (req, res, next) => {
  const productData = await Product.findById(req.params.id);
  const newObj = modifyPrice(req.body, productData);
  res.send(newObj);
};
