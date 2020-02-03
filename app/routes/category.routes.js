module.exports = (app) => {
  const categories = require('../controllers/category.controller.js');

  // Create a new Note
  app.post('/categories', categories.create);

  // Retrieve all Notes
  app.get('/categories', categories.findAll);

  // Retrieve a single Note with noteId
  app.get('/categories/:categoryId', categories.findOne);

  // Update a Note with noteId
  app.put('/categories/:categoryId', categories.update);

  // Delete a Note with noteId
  app.delete('/categories/:categoryId', categories.delete);
}