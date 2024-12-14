// src/controllers/carListingController.js
import CarListing from '../models/car-listing-model.js';

const createCarListing = async (req, res) => {
  try {
    const { carModel, price, phoneNumber, city } = req.body;
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
      phoneNumber,
      maxPictures: parseInt(req.body.maxPictures, 10),
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

export default { createCarListing };