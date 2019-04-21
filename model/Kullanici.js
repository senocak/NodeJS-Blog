const mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
const KullaniciSchema = new Schema({
    email: {type:String, required:true, unique:true},
    sifre: {type:String, required:true},
    tarih: { type: Date, default: Date.now }
}, {
    collection:"kullanici"
});
module.exports = mongoose.model('Kullanici', KullaniciSchema);