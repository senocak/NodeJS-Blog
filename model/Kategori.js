const mongoose = require('mongoose');
const KategoriSchema = new mongoose.Schema({
    baslik: {type:String, required:true},
    url: {type:String, required:true, unique:true},
    tarih: { type: Date, default: Date.now },
    resim: {type:String, required:true}
}, {
    collection:"kategori"
});
module.exports = mongoose.model('Kategori', KategoriSchema);