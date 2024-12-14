// carRoutes.js
import express from 'express';
const router = express.Router();
import carListingController from '../controllers/car-listing-controller.js';
import authMiddleware from '../middlewares/authentication-middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

router.post('/create', 
  authMiddleware,
  upload,
  carListingController.createCarListing
);

export default router;