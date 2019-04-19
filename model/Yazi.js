const mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
const YaziSchema = new Schema({
    baslik: {type:String, required:true,unique:true},
    url: {type:String, required:true},
    icerik: {type:String, required:true},
    tarih: { type: Date, default: Date.now },
    kategori  : [{ type: ObjectId, ref: 'Kategori' }]
}, {
    collection:"yazi"
});
const Yazi = mongoose.model('Yazi', YaziSchema);
module.exports = Yazi;