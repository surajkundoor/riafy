const multer = require("multer");
var crypto = require("crypto");
var path = require("path");

const diskStorageToUploads = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(
        null,
        raw.toString("hex") + Date.now() + path.extname(file.originalname)
      );
    });
  },
});

const imagefilter = function (req, file, cb) {
  // allow images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    return cb(new Error("Only images are allowed."), false);
  }
  cb(null, true);
};

const billUploads = multer({
  storage: diskStorageToUploads,
  fileFilter: imagefilter,
});

module.exports = {
  billupload: billUploads.single("billimage"),
};
