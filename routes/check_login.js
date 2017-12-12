var request = require("request");
var cache = require("memory-cache");
var config = require("../utils/config");

function checkLogin(req, res, next) {
    var username = cache.get("username");
    var password = cache.get("password");
    var id = cache.get("id");

    if (username === null || password === null || id === null){
        req.flash("message", "You are not logged in!");
        return res.redirect("/auth");
    } else {
        request.post(config.URL_API + "/login", {form: {username: username, password: password}}, function (err, httpResponse, body) {
            var result = JSON.parse(body);
            if (result.code === 1000){
                next();
            } else {
                req.flash("message", "" + result.message);
                return res.redirect("/auth");
            }
        });
    }
}

module.exports = checkLogin;