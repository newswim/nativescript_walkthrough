var frameModule = require("ui/frame");
var viewModule = require("ui/core/view");
var dialogsModule = require("ui/dialogs");
var UserViewModel = require("../../shared/view-models/user-view-model");

var user = new UserViewModel({
    email: "dan@dan.com",
    password: "dandandan"
});

exports.loaded = function(args) {
    var page = args.object;
    page.bindingContext = user;
};

exports.signIn = function() {
    user.login()
        .then(function() {
            frameModule.topmost().navigate("views/list/list");
            console.log("Let's see that list")
        }).catch(function(error) {
            console.log(error)
            dialogsModule.alert({
                message: "Unfortunately we could not find your account.",
                okButtonText: "OK"
            });
        });
};

exports.register = function() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/register/register")
};
