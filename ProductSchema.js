const mongoose = require("mongoose");

var productSchema =new mongoose.Schema({
  name: String,
  phone: Number,
});

 module.exports=mongoose.model("products", productSchema);

 