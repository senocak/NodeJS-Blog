var express = require("express");
var router = express.Router();
var indexController = require("./controller/IndexController");
var YaziController = require("./controller/YaziController");
var kategoriController = require("./controller/KategoriController");
var AuthController = require("./controller/AuthController");

router.get("/", indexController.index);
router.get("/cv", indexController.cv);
router.get("/sayfa/:sira", indexController.index);
router.get("/yazi/:yazi_url", indexController.yazi);
router.post("/yazi/yorum/ekle", indexController.yorumEklePost);

router.get("/admin", AuthController.redirectHome, AuthController.indexGet);
router.post("/admin/login", AuthController.redirectHome, AuthController.indexLoginPost);
router.post("/admin/register", AuthController.redirectHome, AuthController.indexRegisterPost);

router.get("/admin/yazi", AuthController.redirectLogin, YaziController.yaziListGet);
router.get("/admin/yazi/:yazi_id/duzenle", AuthController.redirectLogin, YaziController.yaziDuzenleGet);
router.post("/admin/yazi/:yazi_id/duzenle", AuthController.redirectLogin, YaziController.yaziDuzenlePost);
router.get("/admin/yazi/ekle", AuthController.redirectLogin, YaziController.yaziEkleGet);
router.post("/admin/yazi/ekle", AuthController.redirectLogin, YaziController.yaziEklePost);
router.get("/admin/yazi/:yazi_id/sil", AuthController.redirectLogin, YaziController.yaziSilGet);

router.get("/admin/kategori", AuthController.redirectLogin, kategoriController.kategoriListGet);
router.get("/admin/kategori/:kategori_id", AuthController.redirectLogin, kategoriController.kategoriListByIdGet);
router.post("/admin/kategori/ekle", AuthController.redirectLogin, kategoriController.kategoriEklePost);
router.get("/admin/kategori/:kategori_id/sil", AuthController.redirectLogin, kategoriController.kategoriSil);

router.get("/admin/kategori/:kategori_id/duzenle", AuthController.redirectLogin, kategoriController.kategoriDuzenleGet);
router.post("/admin/kategori/:kategori_id/duzenle", AuthController.redirectLogin, kategoriController.kategoriDuzenlePost);

module.exports = router;