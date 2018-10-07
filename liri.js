require("dotenv").config();

//apps
let request = require("request");
let fs = require("fs");
let Spotify = require("node-spotify-api");

//keys
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

//grabs arguments
let data = process.argv;
let input = process.argv[2];

let title = ""
if (process.argv[3] !== undefined) {
    for (i = 3; i < data.length; i++) {
        title += data[i] + " ";
    };
};


//response to data entry
switch (input) {
    case "spotify-this-song":
        STSsearch();
        break;

    case "do-what-it-says":
        DWIS();
        break;

    default:
        console.log("Please enter a valid command.");


};

//SPOTIFY

//If there is no entry, submit Ace of Base The Sign as Title
function STSsearch() {
    if (process.argv[3] === undefined) {
        title = "Ace of Base The Sign"
        STS();
    } else {
        STS();
    }
}

function STS() {
    spotify.search({
        type: 'track',
        query: title,
        limit: 1,
    }, function (err, data) {
        if (data) {
            spotifyResults = data.tracks.items
            spotifyRecord =
                "\nArtist : " + spotifyResults[0].artists[0].name +
                "\nSong Name : " + spotifyResults[0].name +
                "\nPreview Link : " + spotifyResults[0].preview_url +
                "\nAlbum : " + spotifyResults[0].album.name

        }

        else if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(spotifyRecord);;
    });

}
