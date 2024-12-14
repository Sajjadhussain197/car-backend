// carRoutes.js
const express = require('express');
const router = express.Router();
const carListingController = require('../controllers/car-listing-controller');
const authMiddleware = require('../middlewares/authentication-middleware');
const { upload } = require('../utils/file-upload-with-cloudinary');
router.post('/create', 
  authMiddleware,
  (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message, body: req.body, files: req.files });
      }
      next();
    });
  },
  carListingController.createCarListing
);

module.exports = router;