const path = require('path');
const express = require('express')
const app = new express();
const Route = require("./route");
const bodyParser = require('body-parser');
const expressEdge = require('express-edge');
const fileUpload = require("express-fileupload");
const db = require("./db"); 
const cookieParser = require('cookie-parser'); 
const session = require('express-session');
const redisStore  = require('connect-redis')(session);
const redis = require('redis');
const client  = redis.createClient();
app.use(session({
    store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl : 260}),
    expires: new Date(Date.now() + (30 * 86400 * 1000)) ,
    secret: 'anil-senocak', 
    resave: true, 
    saveUninitialized: false, 
}));
app.use(cookieParser());
app.use(expressEdge);
app.use(fileUpload());
app.use(bodyParser.json())
app.use(express.static('public'));
app.use(Route);
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: true}));

const port = 3000;
app.listen(port, () => { console.log('http://localhost:'+port) });