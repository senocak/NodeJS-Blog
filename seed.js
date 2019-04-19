const Kategori = require('./model/Kategori');
Kategori.collection.drop(); 
Kategori.create([{
    _id:"5cb9bb7ab9acda2d6cf92b32",
    baslik: 'Dimebag Darrell',
    url: 'dimebag-darrell',
    resim: 'dimebag-darrell.jpg'
}, {
    _id:"5cb9bb7ab9acda2d6cf92b33",
    baslik: 'Zakk Wylde',
    url: 'zakk-wylde',
    resim: 'zakk-wylde.jpg'
}])
module.exports = Kategori;