import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
    }
  })

// Update to handle multiple images
export const upload = multer({ 
  storage,
  limits: { files: 10 } // Adjust the limit as needed
}).array('pictures', 10); // 'pictures' is the field name, 10 is the max count