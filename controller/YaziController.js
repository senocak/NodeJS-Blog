var path = require('path');
var express = require("express");
const Yazi = require("../model/Yazi");
const Kategori = require("../model/Kategori");

module.exports.yaziEkleGet = async(req, res)=>{
    const kategoriler = await Kategori.find({}).sort({ tarih: -1 })
    var user = {userId:req.session.userId, userEmail : req.session.userEmail }
    res.render("yazi_ekle", {kategoriler, user});
}
module.exports.yaziListGet = async(req, res)=>{
    const yazilar = await Yazi.find({}).populate('kategori')
    var user = {userId:req.session.userId, userEmail : req.session.userEmail }
    const kategoriler = await Kategori.find({}).sort({ tarih: -1 })
    res.render("yazilar", {yazilar, user, kategoriler});
}
module.exports.yaziDuzenleGet = async(req, res)=>{
    const yazi_id = req.params.yazi_id
    const yazi = await Yazi.find({"_id":yazi_id}).populate('kategori')
    const kategoriler = await Kategori.find({}).sort({ tarih: -1 })
    var user = {userId:req.session.userId, userEmail : req.session.userEmail }
    res.render("yazi_duzenle", {kategoriler, yazi, user});
}
module.exports.yaziDuzenlePost = async(req, res)=>{
    const yazi_id = req.params.yazi_id
    var myobj = {baslik:req.body.baslik, icerik:req.body.icerik, kategori:req.body.kategori};
    Yazi.updateOne({"_id":yazi_id},myobj, (err, post) => {
        if (err) console.log("Error:"+err);
        res.redirect('/admin/yazi');
    });
}
module.exports.yaziEklePost = async(req, res)=>{
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
module.exports.yaziSilGet = async(req, res)=>{
    const yazi_id = req.params.yazi_id;
    Yazi.findOneAndRemove({ _id: yazi_id }, function(err, obj) {});
    res.redirect('/admin/yazi');
}
String.prototype.url = function(){
    var string = this;
    var letters = { "İ": "i", "I": "i", "Ş": "s", "Ğ": "g", "Ü": "u", "Ö": "o", "Ç": "c" };
    string = string.replace(/(([İIŞĞÜÇÖ]))+/g, function(letter){ return letters[letter]; })
    string = string.replace(/ /g, "-").replace('/?/g', "-").replace(/!/g, "-").replace(/&/g, "-").replace(/%/g, "-").replace(/'/g, "-").replace(/:/g, "-");
    return string.toLowerCase();
}