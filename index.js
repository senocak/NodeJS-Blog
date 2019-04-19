const db = require("./db");
const path = require('path');
const seed = require("./seed");
const Route = require("./route");
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressEdge = require('express-edge');
const fileUpload = require("express-fileupload");
const app = new express(); 
app.use(seed);
app.use(Route);
app.use(expressEdge);
app.use(fileUpload());
app.use(bodyParser.json())
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: true}));
app.listen(4000, () => { console.log('Uygulamanın çalıştığı port: 4000') });