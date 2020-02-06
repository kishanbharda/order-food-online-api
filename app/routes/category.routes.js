const multer = require('multer');
const config = require('../../config/server.config');

module.exports = (app) => {
  const DIR = './public/images/categories';

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      cb(null , `${Date.now()}${file.originalname}`);
    }
  });

  const categoryImage = multer({ storage });

  const categories = require('../controllers/category.controller.js');

  // Create a new Note
  app.post('/categories', categoryImage.single('image'), categories.create);

  // Retrieve all Notes
  app.get('/categories', categories.findAll);

  // Retrieve a single Note with noteId
  app.get('/categories/:categoryId', categories.findOne);

  // Update a Note with noteId
  app.put('/categories/:categoryId', categoryImage.single('image'), categories.update);

  // Delete a Note with noteId
  app.delete('/categories/:categoryId', categories.delete);
}