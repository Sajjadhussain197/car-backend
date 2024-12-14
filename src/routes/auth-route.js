// authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication');
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


router.post('/register', [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password is required')
], authController.register);

module.exports = router;
