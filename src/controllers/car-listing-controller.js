// src/controllers/carListingController.js
const CarListing = require('../models/car-listing-model');

const createCarListing = async (req, res) => {
  try {
    const { carModel, price, phone, city } = req.body;
    
    // Create image URLs array from uploaded files
    const imageUrls = req.files.map(file => file.path);

    // Check if number of images exceeds max limit
    const maxPictures = parseInt(req.body.maxPictures, 10);
    if (imageUrls.length > maxPictures) {
      return res.status(400).json({ 
        message: `Cannot upload more than ${maxPictures} pictures` 
      });
    }

    // Create new car listing
    const newListing = new CarListing({
      user: req.user.id,
      carModel,
      price,
      phone,
      city,
      images: imageUrls
    });

    const listing = await newListing.save();

    res.status(201).json(listing);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { createCarListing };