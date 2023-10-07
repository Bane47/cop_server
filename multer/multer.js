const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({dest:'uploads/'});

router.post("/upload-image",upload.single('image'),async (req,res)=>{
    console.log(req.body);
    res.send("Uploaded!!")
});

module.exports = router;
