var express = require("express");
const Kullanici = require("../model/Kullanici");
const redis = require("../redis");

module.exports.indexGet = async(req, res)=>{
    check(req, res);
    res.redirect("/admin/kategori");
}
module.exports.indexLoginPost = async(req, res)=>{
    const email = req.body.email;
    const sifre = req.body.sifre;
    const kullanici = await Kullanici.find({email:email, sifre:sifre}).countDocuments() //estimatedDocumentCount
    if (kullanici == "0") {
        res.redirect("/admin");
    }else{
        console.log("Kayıtlı");
        redis.hmset("user", ["login", "1", "email", email]);
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
            res.redirect('/admin');
        });
    }else{
        console.log("Kayıtlı");
        redis.hmset("user", ["login", "1", "email", email]);
        res.redirect("/admin/kategori");
    }
}
module.exports.indexRegisterPost = async(req, res)=>{
    redis.del();
}
function check(req, res) {
    redis.hgetall("user", function(err, obj) {
        if (!obj) {
            console.log("Rediste yok");
            res.render("auth");
        }else{
            console.log("Giriş Başarılı : "+obj.email);
        }
    });
}