//various requires

var express = require("express");
var path = require("path");

//express config
var app = express();
var PORT = process.env.PORT || 3000;

//express middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//router
require("./routing/apiRoutes")(app);
require("./routing/htmlRoutes")(app);

//starts server listening
app.listen(PORT, function() {
    console.log("Server is GO on PORT " + PORT);
});