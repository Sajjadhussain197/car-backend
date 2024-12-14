import mongoose from 'mongoose';

const CarListingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  carModel: {
    type: String,
    required: true,
    minlength: 3
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{11}$/.test(v);
      },
      message: props => `${props.value} is not a valid 11-digit phone number!`
    }
  },
  city: {
    type: String,
    required: true
  },
  images: [{
    type: String,
    required: true
  }],
  maxPictures: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  }
}, { timestamps: true });
export default mongoose.model('CarListing', CarListingSchema);