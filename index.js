const path = require('path');   //Path Kütüphanesi
const express = require('express'); //Express Framework
const app = new express();  // Uygulamamızın express olacağını belirtiyoruz.
const Route = require("./route");   // route.js dosyamızı import ettik
const bodyParser = require('body-parser');  //Body Parser Kütüphanesi
const expressEdge = require('express-edge');    // View Görüntüleme Motoru (.edge)
const fileUpload = require("express-fileupload");   // Express iççin dosya yükleme kütüphanesi
const db = require("./db"); // db.js dosyamızı import ettik
const seed = require("./seed"); // seed.js dosyamızı import ettik
app.use(expressEdge); //    Express uygulamamızın edge motorunu kullanacağını belirttik
app.use(fileUpload());  // File Upload kütüphanesini kullanacağını belirttik
app.use(bodyParser.json()) // Rest isteklerinde gelen veriyi daha iyi okumak için kullandık
app.use(express.static('public'));  // Herkese açık olan dosyaların dizinin belirttik. (.css, .js, .html gibi uzantılar için)
app.use(Route); //  Routing işlemi için kullanıyoruz.
app.use(seed);  // Seed işlemi için kullanıyoruz
app.set('views', __dirname + '/views'); //  Edge motoru için view dosyalarının dizinin belirttik
app.use(bodyParser.urlencoded({extended: true}));
app.listen(4000, () => { console.log('http://localhost:4000') });