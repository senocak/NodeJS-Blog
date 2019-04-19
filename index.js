const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressEdge = require('express-edge');
const Route = require("./route");
const fileUpload = require("express-fileupload");
const app = new express(); 
const Yazi = require('./model/Yazi');
mongoose.connect('mongodb://localhost:27017/nodejs', { useNewUrlParser: true }).then(() => console.error('Connected to Mongo')).catch(err => console.error('Something wrong', err))

var seeder = require('mongoose-seeder'),data = require('./seed/yorum.json');
seeder.seed(data).then(function(dbData){}).catch(function(err) {
    console.log("Seeding Error:");
});
app.use(fileUpload());
app.use(express.static('public'));
app.use(expressEdge);
app.set('views', __dirname + '/views');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(Route);
app.listen(4000, () => { console.log('Uygulamanın çalıştığı port: 4000') });