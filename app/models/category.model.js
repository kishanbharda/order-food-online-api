const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  title: String,
  description: String,
  image: { data: Buffer, contentType: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);