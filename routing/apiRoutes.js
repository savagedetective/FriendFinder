var friendData = require("../app/data/friend");

module.exports = function(app) {

    //lists total friend entries
    app.get("/api/friends", function(req, res){
        return res.json(friendData);
    });

    //how to handle POST requests
    app.post("/api/friends", function(req, res) {

        //grabs user/newFriend inputs
        var userScores = req.body.scores;

        //creates array to hold differences between user scores and friendData scores
        var scoreDifferenceArray = [];

        //placeholder for current best friend
        var currentMatch = 0;

        //runs through friends in FriendData and calculates absolute difference between scores from user input
        for (var i = 0; i < friendData.length; i++) {

            var scoreDifference = 0;

            for (var j = 0; j < userScores.length; j++) {
                scoreDifference += (Math.abs(friendData[i].scores[j] - userScores[j]));
            }

            scoreDifferenceArray.push(scoreDifference);

        }

        //runs through score differences to find best match
        for (var k = 0; k < scoreDifferenceArray.length; k++) {

            if (scoreDifferenceArray[k] <= scoreDifferenceArray[currentMatch]) {
                currentMatch = k;
            }

        }

        //tests scoreDifferenceArray is being pushed to correctly
        console.log(scoreDifferenceArray);
        //tests current match is working
        console.log("The match is array position " + currentMatch);

        //pushes match to modal I hope
        var theMatch = friendData[currentMatch];
        res.json(theMatch);
        
        //pushes new form entries to friends Array
        friendData.push(req.body);

    });
}


