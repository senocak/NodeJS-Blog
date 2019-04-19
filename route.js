var express = require("express");
var router = express.Router();
var indexController = require("./controller/indexController");
var YaziController = require("./controller/YaziController");
var kategoriController = require("./controller/kategoriController");

router.get("/", indexController.index);
router.get("/cv", indexController.cv);
router.get("/sayfa/:sira", indexController.index);
router.get("/yazi/:yazi_url", indexController.yazi);
router.post("/yazi/yorum/ekle", indexController.yorumEklePost);

router.get("/admin/yazi/ekle", YaziController.yaziEkleGet);
router.post("/admin/yazi/ekle", YaziController.yaziEklePost);

router.get("/admin/kategori", kategoriController.kategoriListGet);
router.post("/admin/kategori/ekle", kategoriController.kategoriEklePost);
router.get("/admin/kategori/:kategori_id/sil", kategoriController.kategoriSil);
module.exports = router;