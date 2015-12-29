var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable");
var observableArrayModule = require("data/observable-array");
var viewModule = require("ui/core/view");
var GroceryListViewModel = require("../../shared/view-models/grocery-list-view-model");
var page;

var groceryList = new GroceryListViewModel([]);

var pageData = new observableModule.Observable({
    groceryList: groceryList,
    grocery: ""
});

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;

    groceryList.empty();
    groceryList.load();
};

exports.add = function() {
    // Check for empty submissions
    if (pageData.get("grocery").trim() !== "") {
        // Dismiss the keyboard
        viewModule.getViewById(page, "grocery").dismissSoftInput();
        groceryList.add(pageData.get("grocery"))
            .catch(function() {
                dialogsModule.alert({
                    message: "An error occurred while adding an item to your list.",
                    okButtonText: "OK"
                });
            });
        // Empty the input field
        pageData.set("grocery", "");
    } else {
        dialogsModule.alert({
            message: "Enter a grocery item",
            okButtonText: "OK"
        });
    }
};
