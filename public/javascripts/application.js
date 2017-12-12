$(document).ready(function() {

    $("#login-form-link").click(function(e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $("#register-form-link").removeClass("active");
        $(this).addClass("active");
        e.preventDefault();
        // if (username)
    });
    $("#register-form-link").click(function(e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $("#login-form-link").removeClass("active");
        $(this).addClass("active");
        e.preventDefault();
    });

    $("#login-submit").click(function(e){
        var username = $("#username").val();
        var password = $("#password").val();
        e.preventDefault();
        if (username.trim() === "" || password.trim() === ""){
            alert("Username or Password is empty!");
        } else {
            $.ajax({
                type: "POST",
                url: "/login",
                contentType: "application/x-www-form-urlencoded",
                data: { username: username, password: password },
                success:function(result){
                    window.location = result.redirect;
                }
            });
        }
    });
    
    $("#register-submit").click(function (e) {
        var username = $("#_username").val();
        var password = $("#_password").val();
        var confirm_password = $("#confirm-password").val();
        e.preventDefault();
        if (username.trim() === "" || password.trim() === "" || confirm_password.trim() === ""){
            alert("Username or Password is empty!");
        } else if (password.trim() !== confirm_password.trim()){
            alert("Passwords do not match!");
        } else {
            $.ajax({
                type: "POST",
                url: "/signup",
                contentType: "application/x-www-form-urlencoded",
                data: { username: username, password: password },
                success:function(result){
                    window.location = result.redirect;
                }
            });
        }
    });

    $("#btn_me").click(function (e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: "/my_profile",
            contentType: "application/x-www-form-urlencoded",
            success:function(result){
                window.location = result.redirect;
            }
        });
    });

    // Load index:
    // $.ajax({ url: "/",
    //     context: document.body,
    //     success: function(){
    //         // alert("done");
    //     }
    // });

});