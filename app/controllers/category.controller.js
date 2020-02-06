const Category = require('../models/category.model');
const config = require('../../config/server.config');

// Create and Save a new Category
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    return res.send({
      success: false,
      message: "Category title can not be empty",
      data: []
    });
  }

  // Create a Category
  const category = new Category({
    title: req.body.title || "Untitled Category",
    description: req.body.description,
    image: req.file ? `${config.serverUrl}/images/categories/${req.file.filename}` : ''
  });

  // Save Category in the database
  category.save().then(data => {
    res.send({
      success: true,
      message: "Category added successfully !!!",
      data
    });
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Category."
    });
  });
};

// Retrieve and return all categories from the database.
exports.findAll = (req, res) => {
  Category.find().then(categories => {
    if (categories.length > 0) {
      res.send({
        success: true,
        message: "Category fetched successfully !!!",
        data: categories
      });
    } else {
      res.send({
        success: false,
        message: "Category list is empty !!!",
        data: categories
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving categories."
    });
  });
};

// Find a single category with a categoryId
exports.findOne = (req, res) => {

};

// Update a category identified by the categoryId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.title) {
    return res.send({
      success: false,
      message: "Title cannot be empty",
      data: []
    })
  }

  // Find note and update it with the request body
  Category.findByIdAndUpdate(req.params.categoryId, {
    title: req.body.title || "Untitled Category",
    description: req.body.description,
    image: req.file ? `${config.serverUrl}/images/categories/${req.file.filename}` : req.body.image
  }, { new: true }).then(category => {
    if (!category) {
      return res.send({
        success: false,
        message: "Category not found with id " + req.params.categoryId
      });
    }
    res.send({
      success: true,
      message: "Category updated successfully !!!",
      data: []
    });
  }).catch(err => {
    if (err.kind === 'ObjectId') {
      return res.send({
        success: false,
        message: "Category not found with id " + req.params.categoryId,
        data: []
      });
    }
    return res.status(500).send({
      message: "Error updating category with id " + req.params.categoryId
    });
  });
};

// Delete a category with the specified categoryId in the request
exports.delete = (req, res) => {
  Category.findByIdAndRemove(req.params.categoryId).then(category => {
    if (!category) {
      return res.send({
        success: false,
        message: "Category not found with id " + req.params.categoryId,
        data: category
      });
    }
    return res.send({
      success: true,
      message: "Category deleted successfully!",
      data: category
    });
  }).catch(err => {
    if (err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.send({
        success: false,
        message: "Category not found with id " + req.params.categoryId,
        data: null
      });
    }
    return res.send({
      success: false,
      message: "Could not delete category with id " + req.params.categoryId,
      data: null
    });
  });
};