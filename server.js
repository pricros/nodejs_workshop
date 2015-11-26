// server.js
// load the things we need
var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

// about page 
app.get('/about', function(req, res) {
    res.render('pages/about');
});

// add pdf download feature
var PDFDocument = require('pdfkit'); 
var fs = require('fs'); 
var blobStream = require('blob-stream'); 
var doc = new PDFDocument(); 

doc.pipe(fs.createWriteStream('outpdf.pdf')); 
doc.fontSize(25) 
.text('Test Text..', 100, 80); 
doc.save() 
.moveTo(100, 150) 
.lineTo(100, 250) 
.lineTo(200, 250) 
.fill("#FF3300"); 
doc.circle(280, 200, 50) 
.fill("#6600FF"); 
// an SVG path 
doc.scale(0.6) 
.translate(470, 130) 
.path('M 250,75 L 323,301 131,161 369,161 177,301 z') 
.fill('red', 'even-odd') 
.restore(); 
doc.end();

app.get('/download', function(req, res){
  var file = __dirname + '/outpdf.pdf';
  res.download(file); // Set disposition and send it.
});

app.listen(8080);
console.log('8080 is the magic port');
