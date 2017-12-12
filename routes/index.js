var express = require("express");
var router = express.Router();
var cache = require("memory-cache");
var checkLogin = require("../routes/check_login");

/* GET home page. */
router.get("/", checkLogin, function (req, res) {
    res.render("pages/index", {title: "Fly - " + cache.get("username"), message: ""});
});

module.exports = router;
