var express = require("express");
var router = express.Router();
var request = require("request");
var cache = require("memory-cache");
var config = require("../utils/config");

/* GET - Load page login-signup */
router.get("/auth", function (req, res) {
    res.render("pages/auth", {message: req.flash("message")});
});

/* POST - Login */
router.post("/login", function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    request.post(config.URL_API + "/login", {form: {username: username, password: password}}, function (err, httpResponse, body) {
        var result = JSON.parse(body);
        if (result.code === 1000){
            cache.put("username", username);
            cache.put("password", password);
            cache.put("id", result.data.id);
            return res.send({redirect: "/"});
        } else {
            req.flash("message", result.message);
            return res.send({redirect: "/auth"});
        }
    });
});

/* POST - SignUp */
router.post("/signup", function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    request.post(config.URL_API + "/create_user", {form: {username: username, password: password}}, function (err, httpResponse, body) {
        var result = JSON.parse(body);
        if (result.code === 1000){
            cache.put("username", username);
            cache.put("password", password);
            cache.put("id", result.id);
            return res.send({redirect: "/profile/" + cache.get("id")});
        } else {
            req.flash("message", result.message);
            return res.send({redirect: "/auth"});
        }
    });
});

/* GET - Log out */
router.get("/logout", function (req, res) {
    cache.put("username", "");
    cache.put("password", "");
    cache.put("id", "");
    req.flash("info", result.message);
    return res.send({redirect: "/auth"});
});

module.exports = router;
