const multer = require('multer');

module.exports = (app) => {

  const DIR = './public/images/categories';

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      cb(null , file.originalname);
    }
  });

  const upload = multer({ storage: storage });

  app.post('/upload', upload.single('image'), (req, res, next) => {
    console.log(req.file.path);
    res.status(201).json({
      message: "File uploaded successfully"
    });
  });

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