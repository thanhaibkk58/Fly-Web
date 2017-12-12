var express = require("express");
var router = express.Router();
var request = require("request");
var cache = require("memory-cache");
var config = require("../utils/config");
var checkLogin = require("../routes/check_login");

/* GET - Load page profile */
router.get("/profile/:id", function (req, res) {
    var userId = req.params.id;
    res.render("pages/profile", {message: req.flash("message")});
});

/* GET - Get my profile */
router.get("/my_profile", function (req, res) {
    var userId = cache.get("id");
    var url = config.URL_API + "/get_profile_user?user_id=" + userId + "&object_id=" + userId;
    // var url = "http://fly-chat-app.herokuapp.com/get_profile_user?user_id=5a2c22c7e2339700042679f8&object_id=5a2c22c7e2339700042679f8";
    request.get(url, function (err, httpResponse, body) {
        console.error("JSON: " + body);
        if (err) {
            req.flash("message", err.toString());
            return res.send({redirect: "/"});
        }
        var result = JSON.parse(body);
        // var result = JSON.parse(JSON.stringify(body));
        if (result.code === 1000){
            // var name = result.data.profile.name;
            // var username = cache.get("username");
            // var gender = result.data.profile.gender;
            return res.send({redirect: "/"});
            // return res.render("pages/profile", {message: "", name: name, username: username, userId: userId, gender: gender});
        } else {
            req.flash("message", result.message);
            return res.send({redirect: "/profile/" + cache.get("id")});
        }
    });
    // return res.send({redirect: "/"});
});

module.exports = router;
