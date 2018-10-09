// require `request` and the Node `fs` (filesystem) module
var request = require('request');
var fs = require('fs');
var token = require('./secrets');
var https = require('https');
var repoOwner = process.argv[2];
var repoName = process.argv[3];
if (repoOwner === undefined || repoName === undefined) {
  console.log("unspecified params");
  throw new Error;
}


console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, callback) {
    var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors";
    var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
      'User-Agent': 'GITHUB_TOKEN'

      }
  };
  request(options, function(err, res, body) {
    // parse the JSON string into an object and pass this object
    //(an array of contributor objects) to the callback function.
    var parse = JSON.parse(body);
    callback(err, parse);
  });
}

// the callback function
getRepoContributors(repoOwner, repoName, function(err, result) {
  //console.log(result);
  for (var i = 0; i < result.length; i++) {
    var avurl = result[i]["avatar_url"];
    var file = "./avatars/" + result[i]["login"] + ".jpg";
    downloadImageByURL(avurl, file);
  };
  console.log("Errors:", err);
  // console.log("Result:", result);
});

function downloadImageByURL(url, filePath) {
  request(url).pipe(fs.createWriteStream(filePath))

}



