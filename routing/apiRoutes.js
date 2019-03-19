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

        //This runs for each friend found in friendData
        for (var i = 0; i < friendData.length; i++) {

            var scoreDifference = 0;

            //once per friend, each score is compared against each user input score
            for (var j = 0; j < userScores.length; j++) {

                //The difference between each score comparison is added up to one number
                scoreDifference += (Math.abs(friendData[i].scores[j] - userScores[j]));

                //cycles through each score differential and constantly updates best match
                if (scoreDifferenceArray[j] <= scoreDifferenceArray[currentMatch]) {
                    currentMatch = j;
                }
            }

            //once per friend, the overall score differential is added to scoreDifferenceArray
            scoreDifferenceArray.push(scoreDifference);

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


