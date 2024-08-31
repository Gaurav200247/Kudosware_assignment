const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "kudosware_assignment_resumes",
  },
});

const fileFilter = (req, file, cb) => {
  const ext = file.mimetype.split("/")[1];

  if (ext === "pdf") {
    cb(null, true);
  } else {
    cb(new Error("Not a pdf file!!"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
}).single("resume_pdf");

module.exports = upload;
