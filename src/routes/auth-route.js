// authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { body, validationResult } = require('express-validator');

router.post('/login', [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password is required')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, authController.login);

module.exports = router;

// carRoutes.js
const express = require('express');
const router = express.Router();
const carListingController = require('../controllers/carController');
const authMiddleware = require('../middlewares/authMiddleware');
const { upload } = require('../utils/fileUpload');
const { body, validationResult } = require('express-validator');

router.post('/create', 
  authMiddleware,
  upload.array('images'),
  [
    body('carModel').isLength({ min: 3 }).withMessage('Car model must be at least 3 characters'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('phoneNumber').matches(/^\d{11}$/).withMessage('Phone number must be 11 digits'),
    body('city').notEmpty().withMessage('City is required'),
    body('maxPictures').isInt({ min: 1, max: 10 }).withMessage('Max pictures must be between 1 and 10')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  carListingController.createListing
);

module.exports = router;