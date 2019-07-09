const multer = require('multer')
const express = require("express");
const router = express.Router();


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

var upload = multer({ storage: storage });
router.post('/',upload.single("file"),function(req,res){
  console.log(req.file.originalname)
  const result = req.file.originalname
  return res.status(200).json(result);
})

module.exports = router;