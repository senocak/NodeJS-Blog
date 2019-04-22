var path = require('path');
var express = require("express"); 
const Yazi = require("../model/Yazi");
const Kategori = require("../model/Kategori");
const Yorum = require("../model/Yorum");

module.exports.cv = async(req, res)=>{
    console.log("cv");
    res.send("cv");
}
module.exports.index = async(req, res, next)=>{ 
    const limit = 3;
    var sira = req.params.sira;
    var aktif = sira;
    if (typeof sira === "undefined" | sira == "1") {
        sira = 0;
        aktif = 1;
    }else{
        sira = sira - 1;
        sira = sira * limit;
    }
    const yazilar = await Yazi.find({}).populate('kategori').sort({ tarih: -1 }).limit(limit).skip(sira); //.count()
    const aktif_sayfa_yazilar = await Yazi.find({}).populate('kategori').sort({ tarih: -1 }).limit(limit).skip(sira).countDocuments()
    if (aktif_sayfa_yazilar == "0") {
        res.redirect('/');
        console.log("Please seed the db first."); // If there is no post at all. It will redirect forever.
    }else{
        var toplam = await Yazi.find({}).countDocuments();
        toplam = toplam / limit;
        const kategoriler = await Kategori.find({}).sort({ tarih: -1 });
        var user = {userId:req.session.userId, userEmail : req.session.userEmail }
        res.render("index", {yazilar, toplam, aktif, kategoriler, user });
    }
}
module.exports.yorumEklePost = async(req, res)=>{
    const myobj = { 
        email: req.body.email, 
        yorum: req.body.yorum,
        yazi:req.body.yazi_id
    };
    Yorum.create(myobj, (err, post) => {
        if (err) console.log("Error:"+err);
        res.redirect('/yazi/'+req.body.yazi_url);
    });
}
module.exports.yazi = async(req, res)=>{
    const yazi_url = req.params.yazi_url;
    const yazilar = await Yazi.find({url:yazi_url}).populate('kategori');
    var yazi_id;
    yazilar.forEach(element => { yazi_id = element._id; });
    const yorumlar = await Yorum.find({yazi:yazi_id}).sort({ tarih: -1 }).populate('yazi');
    const kategoriler = await Kategori.find({}).sort({ tarih: -1 });
    var user = {userId:req.session.userId, userEmail : req.session.userEmail }
    res.render("yazi", {yazilar, yorumlar, kategoriler, user});
}