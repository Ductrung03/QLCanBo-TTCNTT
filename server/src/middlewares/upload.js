//server/src/middlewares/upload.js
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./uploads/bangcap",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

module.exports = upload;
