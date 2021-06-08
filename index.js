require('dotenv').config()
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
var multer = require('multer')
var upload = multer({ dest: './uploads/'})
var cloudinary = require('cloudinary')

app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/', upload.single('myFile'), (req, res) => {
  cloudinary.uploader.upload(req.file.path, (result) => {
    var imageId = `${result.public_id}.jpg`
    var src = cloudinary.image(imageId, {effect: "grayscale", width: 224, crop: "fill"})
    res.render('image', { imgSrc: src })
  })
})

app.listen(3000);
