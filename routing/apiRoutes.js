var friendData = require("../app/data/friend");

module.exports = function(app) {
    app.get("/api/friends", function(req, res){
        return res.json(friendData);
    });
}