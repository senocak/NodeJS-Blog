var path = require('path');
var express = require("express");
const Yazi = require("../model/Yazi");
const Yorum = require("../model/Yorum");
const Kategori = require("../model/Kategori");

module.exports.YorumListGet = async(req, res)=>{
    const yorumlar = await Yorum.find({}).populate('yazi')
    var user = {userId:req.session.userId, userEmail : req.session.userEmail }
    const kategoriler = await Kategori.find({}).sort({ tarih: -1 })
    res.render("yorum", {yorumlar, user, kategoriler});
}
module.exports.YorumSilGet = async(req, res)=>{
    const yorum_id = req.params.yorum_id;
    Yorum.findOneAndRemove({ _id: yorum_id }, function(err, obj) {});
    res.redirect('/admin/yorum');
}