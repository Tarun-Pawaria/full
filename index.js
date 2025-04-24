// require("./config.js");
// const productModel=require("./ProductSchema");
// var express=require('express');

// var app=express();

// app.use(express.json());

// app.post('/insert',async function(req,res){
//  var data = new productModel({ name: "I-Phone", phone: 5647567 });
//   var result = await data.save();
//   console.log(result);
//   res.send(result);
// })

// app.get('/show',async function(req,res){
//   const products = await productModel.find();
//   res.send(products);

// })

// app.delete('/it',function(req,res){

// })

// app.put('/iert',function(req,res){

// })


// app.listen(3000, () => {
//     console.log("Server running on http://localhost:3000");
//   });



  require("./utils/config.js");
const productModel = require("./ProductSchema");
const express = require("express");

const app = express();
app.use(express.json());

app.post('/insert', async function(req, res) {
  const data = new productModel({ name: "I-Phone", phone: 5647567 });
  const result = await data.save();
  console.log(result);
  res.send(result); // Don't forget to respond
});

app.get('/show', async function(req, res) {
  try {
    const products = await productModel.find();
    res.send(products);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching products");
  }
});

app.delete('/delete/:id', async function(req, res) {
  const result = await productModel.findByIdAndDelete(req.params.id);
  res.send(result);
});

app.put('/update/:id', async function(req, res) {
  const result = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(result);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
