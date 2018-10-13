require("dotenv").config();

//apps
let request = require("request");
let Spotify = require("node-spotify-api");
let moment = require("moment");
let fs = require("fs");

//keys
let keys = require("./keys.js");
let spotify = new Spotify(keys.spotify);

//grabs arguments
let entry = process.argv;
let input = process.argv[2];
let title = "";
if (process.argv[3] !== undefined) {
    for (i = 3; i < entry.length; i++) {
        title += entry[i] + " ";
    };
};


//response to data entry
switch (input) {
    case "spotify-this-song":
        STSsearch();
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        DWIS();
        break;

    case "concert-this":
        concert();
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

//OMDB

//If no movie is entered, populate Mr. Nobody
function movie() {
    if (process.argv[3] === undefined) {
        title = "Mr.Nobody";
        movieResult();
        //Adjust for OMDB Search        
    } else if (title !== undefined) {
        titleAdjust = title.split(" ");
        title = titleAdjust.join("+");
        movieResult();
    };
};

function movieResult() {
    let queryURL = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=df653b6d";

    request(queryURL, function (error, response, body) {
        if (!error && response.statusCode === 200 && body) {
            let data = JSON.parse(body);
            let movieData =
                "\nTitle : " + data.Title +
                "\nRelease Year : " + data.Year +
                "\nIMDB Rating : " + data.imdbRating +
                "\nRotten Tomatoes Rating : " + data.Ratings[1].Value +
                "\nThis movie was produced in : " + data.Country +
                "\nLanguage : " + data.Language +
                "\nPlot : " + data.Plot +
                "\nFeatured Actors : " + data.Actors
            console.log(movieData);
            if (data.Error == 'Movie not found!') {
                console.log("Try another title, please.");
            };
        } else if (data.Ratings.length < 2) {
            let movieData =
                "\nTitle : " + data.Title +
                "\nRelease Year : " + data.Year +
                "\nIMDB Rating : " + data.imdbRating +
                "\nRotten Tomatoes Rating : " + data.Ratings[1].Value +
                "\nThis movie was produced in : " + data.Country +
                "\nLanguage : " + data.Language +
                "\nPlot : " + data.Plot +
                "\nFeatured Actors : " + data.Actors

            if (err) {
                console.log("No data available");
            };
            console.log(movieData);
        }
        else if (data.Ratings[1].Value !== undefined) {
            let movieData =
                "\nTitle : " + data.Title +
                "\nRelease Year : " + data.Year +
                "\nIMDB Rating : " + data.imdbRating +
                "\nRotten Tomatoes Rating : " + data.Ratings[1].Value +
                "\nThis movie was produced in : " + data.Country +
                "\nLanguage : " + data.Language +
                "\nPlot : " + data.Plot +
                "\nFeatured Actors : " + data.Actors

            if (err) {
                console.log("No data available");
            };
            console.log(movieData);
        };
    });

};

//BandsInTown

//If no band is entered, ask in the right format
function concert() {
    if (process.argv[3] === undefined) {
        console.log("Please enter an artist/band name.");
        concertResult();
        //Adjust for BIT Search
    } else if (process.argv[3] !== undefined) {
        //    titleAdjust = title.split(" ");
        //    title = titleAdjust.join("+");
        concertResult();
    };
};

function concertResult() {
    let arg = process.argv[3];
    let titleAdjust = arg.split("-");
    let title = titleAdjust.join("+");
    
    var queryURL = "https://rest.bandsintown.com/artists/" + title + "/events?app_id=codingbootcamp";

    request(queryURL, function (error, response, body) {

        let data = JSON.parse(body);
        
        for (var i = 0; i < data.length; i++) {
            if (!error && response.statusCode === 200) {
                let date = data[i].datetime;
                let dateNew = moment(date);
                let dateFinal = dateNew.format("MM/DD/YYYY");
                console.log("Venue Name: " + data[i].venue.name);
                console.log("Location: " + data[i].venue.city + ", " + data[i].venue.country);
                console.log("Date: " + dateFinal);
                

            }
            else if (error) {
                console.log(error);
            };

        }

    });
}


//Do What It Says

function DWIS() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            console.log("There was an error. Try Again.");
        }
        let output = data.split(",");
        let action = output[0];
        process.argv[3] = output[1];
        title = process.argv[3];
        if (action === 'spotify-this-song') {
            STSsearch();
        };
        if (action === 'movie-this') {
            movie();
        };

    });
}
