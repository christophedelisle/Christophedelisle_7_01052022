// Storage of images on our server in the images folder
const multer = require("multer");

// "dictionary" of extensions to translate
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};

//Multer configuration object (file storage destination (here "/images") and file renaming)
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images/posts");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage });
