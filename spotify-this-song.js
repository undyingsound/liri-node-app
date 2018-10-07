var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: "dafa3b12152c443f9437ee6587b6f728",
  secret: "6c3a3b2424824544bbf92f6f5c0a561d"
});
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});