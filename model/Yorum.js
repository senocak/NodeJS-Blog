const mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
const YorumSchema = new Schema({
    email: {type:String, required:true},
    yorum: {type:String, required:true, unique:true},
    tarih: { type: Date, default: Date.now },
    yazi  : [{ type: ObjectId, ref: 'Yazi' }]
}, {
    collection:"yorum"
});
module.exports = mongoose.model('Yorum', YorumSchema);