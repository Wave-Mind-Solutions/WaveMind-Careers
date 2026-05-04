const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'resumes',
    // 'raw' is safer for PDFs to avoid Cloudinary's image processing/validation
    resource_type: 'raw',
    // We can still suggest a format or let it be detected
    public_id: (req, file) => {
      const name = file.originalname.split('.')[0];
      return `${Date.now()}-${name}`;
    },
  },
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

module.exports = { upload };
