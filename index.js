const path = require('path');   //Path Kütüphanesi
const express = require('express'); //Express Framework
const app = new express();  // Uygulamamızın express olacağını belirtiyoruz.
const Route = require("./route");   // route.js dosyamızı import ettik
const bodyParser = require('body-parser');  //Body Parser Kütüphanesi
const expressEdge = require('express-edge');    // View Görüntüleme Motoru (.edge)
const fileUpload = require("express-fileupload");   // Express iççin dosya yükleme kütüphanesi
const db = require("./db"); // db.js dosyamızı import ettik

//const seed = require("./seed"); // seed.js dosyamızı import ettik
//app.use(seed);  // Seed işlemi için kullanıyoruz

const cookieParser = require('cookie-parser'); //Cookie Parser Kütüphanesi
app.use(cookieParser());  //Uygulamamızın Cookie Parser kütüphanesi kullanmasını için kullandık
const session = require('express-session'); // Session işlemlerimiz için kullanılan kütüphane
var redisStore  = require('connect-redis')(session);
const redis = require('redis');
const client  = redis.createClient();
app.use(session({
    store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl : 260}),
    expires: new Date(Date.now() + (30 * 86400 * 1000)) ,
    secret: 'anil-senocak', 
    resave: true, 
    saveUninitialized: false, 
}));
app.use(expressEdge); //    Uygulamamızın edge motorunu kullanacağını belirttik
app.use(fileUpload());  // File Upload kütüphanesini kullanacağını belirttik
app.use(bodyParser.json()) // Rest isteklerinde gelen veriyi daha iyi okumak için kullandık
app.use(express.static('public'));  // Herkese açık olan dosyaların dizinin belirttik. (.css, .js, .html gibi uzantılar için)
app.use(Route); //  Routing işlemi için kullanıyoruz.
app.set('views', __dirname + '/views'); //  Edge motoru için view dosyalarının dizinin belirttik
app.use(bodyParser.urlencoded({extended: true}));

const port = 3000;
app.listen(port, () => { console.log('http://localhost:'+port) });