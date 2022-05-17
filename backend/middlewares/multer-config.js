const multer = require("multer");

// "dictionnaire" des extensions à traduire
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};

// Objet de configuration de multer (destination de stockage du fichier ( ici "/images") et renommage du fichier)
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
