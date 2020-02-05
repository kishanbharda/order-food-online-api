const Category = require('../models/category.model');

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
    image: req.body.image
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
    res.send(categories);
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

};

// Delete a category with the specified categoryId in the request
exports.delete = (req, res) => {
  Category.findByIdAndRemove(req.params.categoryId).then(category => {
    if (!category) {
      return res.status(404).send({
        message: "Category not found with id " + req.params.category
      });
    }
    res.send({ message: "Category deleted successfully!" });
  }).catch(err => {
    if (err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        message: "Category not found with id " + req.params.categoryId
      });
    }
    return res.status(500).send({
      message: "Could not delete category with id " + req.params.categoryId
    });
  });
};