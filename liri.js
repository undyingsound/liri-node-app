require("dotenv").config();

let keys = require("keys").config();
let spotify = new Spotify(keys.spotify);



let spotify = require("./keys");
let spotifyRequest = process.argv[2];

spotify.search({ type: 'track', query: spotifyRequest }, function(err, data) {
  if ( err ) {
      console.log('Error occurred: ' + err);
      return;
  }
  console.log(data);
  
});