var path = require('path');
var express = require("express");
const Kategori = require("../model/Kategori");
const Yazilar = require("../model/Yazi");
const fileUpload = require("express-fileupload");
const fs = require('fs')

module.exports.kategoriListGet = async(req, res)=>{
    const kategoriler = await Kategori.find({}).sort({ tarih: -1 })
    var user = {userId:req.session.userId, userEmail : req.session.userEmail }
    res.render("kategori_index", {kategoriler, user});
}
module.exports.kategoriListByIdGet = async(req, res)=>{
    const kategori_id = req.params.kategori_id
    const kategoriler = await Kategori.find({"_id":kategori_id}).sort({ tarih: -1 })
    var user = {userId:req.session.userId, userEmail : req.session.userEmail }
    res.render("kategori_index", {kategoriler, user});
}
module.exports.kategoriEklePost = function(req, res) {
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('Resim Seçmek Zorundasınız.');
    }
    const resim = req.files.resim
    const url = (req.body.baslik).url();
    const myobj = { baslik: req.body.baslik, url: url, resim:resim.name };
    resim.mv(path.resolve(__dirname+'/../public/kategori/'+resim.name),function(error){
        // 1276 X 319
        if (error)console.log("Hata:"+error);
        Kategori.create(myobj, (err, post) => {
            if (err) console.log("Error:"+err);
            res.redirect('/admin/kategori');
        });
    })    
}
module.exports.kategoriSil = async(req, res)=>{
    const kategori_id = req.params.kategori_id;
    var kategori_resim;
    const kategori = await Kategori.find({_id:kategori_id})
    kategori.forEach(element => { kategori_resim = element.resim; });
    try {
        fs.unlinkSync(__dirname+'/../public/kategori/'+kategori_resim);
        Kategori.findOneAndRemove({ _id: kategori_id }, function(err, obj) {}); //deleteOne
        Yazilar.deleteMany({ kategori: kategori_id }, function(err, obj) {});
    } catch(err) {
        console.log("Dosya Silinme Hatası: "+err)
    }
    res.redirect('/admin/kategori');
} 
module.exports.kategoriDuzenleGet = async(req, res)=>{
    const kategori_id = req.params.kategori_id
    const kategori = await Kategori.find({_id:kategori_id})
    var user = {userId:req.session.userId, userEmail : req.session.userEmail }
    const kategoriler = await Kategori.find({}).sort({ tarih: -1 })
    res.render("kategori_duzenle",{kategori, user, kategoriler});
}
module.exports.kategoriDuzenlePost = async(req, res)=>{
    const kategori_id = req.params.kategori_id
    var myobj = {};
    if (Object.keys(req.body.baslik).length != "0") {
        myobj.baslik = req.body.baslik
        myobj.url = (req.body.baslik).url();
        if(req.files){
            const resim = req.files.resim
            myobj.resim = resim.name
            resim.mv(path.resolve(__dirname+'/../public/kategori/'+resim.name),function(error){
                // 1276 X 319
                if (error)console.log("Hata:"+error);
            })  
        }
    }else{
        if(req.files){
            const resim = req.files.resim
            myobj.resim = resim.name
            resim.mv(path.resolve(__dirname+'/../public/kategori/'+resim.name),function(error){
                // 1276 X 319
                if (error)console.log("Hata:"+error);
            })  
        }
    }
    Kategori.updateOne({"_id":kategori_id},myobj, (err, post) => {
        if (err) console.log("Error:"+err);
        res.redirect('/admin/kategori');
    });
}
String.prototype.url = function(){
    var string = this;
    var letters = { "İ": "i", "I": "i", "Ş": "s", "Ğ": "g", "Ü": "u", "Ö": "o", "Ç": "c" };
    string = string.replace(/(([İIŞĞÜÇÖ]))+/g, function(letter){ return letters[letter]; })
    string = string.replace(/ /g, "-").replace('/?/g', "-").replace(/!/g, "-").replace(/&/g, "-").replace(/%/g, "-").replace(/'/g, "-").replace(/:/g, "-");
    return string.toLowerCase();
}