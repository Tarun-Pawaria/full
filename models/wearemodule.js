const mongoose = require('mongoose');

const weareSchema = new mongoose.Schema({
  Description: {
    type: String,
    required: true // <-- correct spelling
  }
});

module.exports = mongoose.model('weare', weareSchema); // Capitalized model name is conventional
