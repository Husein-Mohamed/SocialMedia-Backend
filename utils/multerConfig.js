const multer = require("multer");
//const cloudinary = require('./CloudenaryConfig');
const cloudinary = require('cloudinary').v2;


// Configuration 
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret:process.env.API_SECRET
});

// Generate 
const url = cloudinary.url("olympic_flag", {
  width: 100,
  height: 150,
  Crop: 'fill'
});
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() +'.'+file.mimetype.split('/')[1]
    );
  },
});
const upload = multer({
  storage: storage,
});
const uploadToMulter = upload.single("pp") ; 

const uploadPP = async(req, res ,next) => {
  try {
  let result =  await cloudinary.uploader.upload('../public/images/pp-1685956797590.png',  {public_id: "olympic_flag"})
  console.log(url)
  return res.status(200).json({ msg: "image successfully uploaded" });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {uploadToMulter ,  uploadPP} ; 
