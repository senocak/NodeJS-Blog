var path = require('path');
var express = require("express");
const Yazi = require("../model/Yazi");
const Kategoriler = require("../model/Kategori");

module.exports.yaziEkleGet = async(req, res)=>{
    const kategoriler = await Kategoriler.find({})
    res.render("yazi_ekle", {kategoriler});
}
module.exports.yaziEklePost = function(req, res){
    const myobj = { 
        baslik: req.body.baslik, 
        icerik: req.body.icerik, 
        url: (req.body.baslik).url(), 
        kategori:req.body.kategori 
    };
    Yazi.create(myobj, (err, post) => {
        if (err) console.log("Error:"+err);
        res.redirect('/');
    });
}
String.prototype.url = function(){
    var string = this;
    var letters = { "İ": "i", "I": "i", "Ş": "s", "Ğ": "g", "Ü": "u", "Ö": "o", "Ç": "c" };
    string = string.replace(/(([İIŞĞÜÇÖ]))+/g, function(letter){ return letters[letter]; })
    string = string.replace(/ /g, "-").replace('/?/g', "-").replace(/!/g, "-").replace(/&/g, "-").replace(/%/g, "-").replace(/'/g, "-").replace(/:/g, "-").replace(/,/g, "-");
    return string.toLowerCase();
}