var express = require("express");
const Kullanici = require("../model/Kullanici");
//const redis = require("../redis");

module.exports.indexGet = async(req, res)=>{
    const kategoriler = await Kategori.find({}).sort({ tarih: -1 });
    res.render("auth", { kategoriler});
}
module.exports.indexLoginPost = async(req, res)=>{
    const email = req.body.email;
    const sifre = req.body.sifre;
    const kullanici = await Kullanici.find({email:email, sifre:sifre}).countDocuments() //estimatedDocumentCount or count
    if (kullanici == "0") {
        console.log("Forbidden");
        res.redirect("/admin");
    }else{
        console.log("Success");
        const kullanici = await Kullanici.find({email:email, sifre:sifre})
        var {userId, userEmail, userSifre} = "";
        kullanici.forEach(element => { 
            userId = element._id,
            userEmail = element.email,
            userSifre = element.sifre 
        });
        req.session.userId = userId;
        req.session.userEmail = userEmail;
        res.redirect("/admin/kategori");
    }
}
module.exports.indexRegisterPost = async(req, res)=>{
    const email = req.body.email;
    const sifre = req.body.sifre;
    const kullanici = await Kullanici.find({email:email, sifre:sifre}).countDocuments() //estimatedDocumentCount
    if (kullanici == "0") {
        Kullanici.create({email: email, sifre: sifre }, (err, post) => {
            if (err) console.log("Error:"+err);
            console.log("Kullanıcı Oluşturuldu.");
            res.redirect('/admin');
        });
    }else{
        console.log("Success");
        const kullanici = await Kullanici.find({email:email, sifre:sifre})
        var {userId, userEmail, userSifre} = "";
        kullanici.forEach(element => { 
            userId = element._id,
            userEmail = element.email,
            userSifre = element.sifre 
        });
        req.session.userId = userId;
        req.session.userEmail = userEmail;
        res.redirect("/admin/kategori");
    }
}
module.exports.indexlogoutGet = async(req, res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log("Hata:"+err);
        } else {
            res.redirect('/admin');
        }
    });
}
module.exports.redirectLogin = (req, res, next)=>{
    if (!req.session.userId) {
        res.redirect("/admin")
    }else{
        next()
    }
}
module.exports.redirectHome = (req, res, next)=>{
    if (req.session.userId) {
        res.redirect("/admin/kategori")
    }else{
        next()
    }
}