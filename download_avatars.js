// require `request` and the Node `fs` (filesystem) module
var request = require('request');
var fs = require('fs');
var token = require('./secrets');
var https = require('https');


console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
    var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors";
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
      'User-Agent': 'GITHUB_TOKEN'

      }
  };
  request(options, function(err, res, body) {
    // parse the JSON string into an object and pass this object
    //(an array of contributor objects) to the cb function.
    var parse = JSON.parse(body);
    cb(err, parse);
  });
}

// the callback function
getRepoContributors("jquery", "jquery", function(err, result) {
  //console.log(result);
  for (var i = 0; i < result.length; i++) {
    console.log(result[i]["avatar_url"]);
  };
  console.log("Errors:", err);
  // console.log("Result:", result);
});



