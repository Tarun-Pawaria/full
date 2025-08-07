const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  certificate: {
    type: String,
    required: true // <-- correct spelling
  },
  certificate_title: {
    type: String,
    required: true // <-- correct spelling
  }
});

module.exports = mongoose.model('Certificate', certificateSchema); // Capitalized model name is conventional
