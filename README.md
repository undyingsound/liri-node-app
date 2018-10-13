# liri-node-app

# Overview
LIRI is a Language Interpretation and Recognition Interface. We are going to input parameters to retrieve data from Bands In Town, Spotify, and OMDB APIs and display in the command line using node.js.


# Useable Commands:

The following inputs are available to use in your terminal with the LIRI App:

### node liri concert-this (Enter Artist/Band Name)

Using the Bands In Town API, this will display:

  * Name of the venue

  * Venue location

  * Date of the Event
  
  
  ### node liri spotify-this-song (Song Name)

Using the Spotify API, this will display:

  * Artist(s)

  * The song's name

  * A preview link of the song from Spotify

  * The album that the song is from
  
  *Note: If you do not enter a song name, you will get one picked for you! It's a good one!
  
  ### node liri movie-this (Movie Title)

Using the OMDB API, this will display:

  * Title of the movie.
  * Year the movie came out.
  * IMDB Rating of the movie.
  * Rotten Tomatoes Rating of the movie.
  * Country where the movie was produced.
  * Language of the movie.
  * Plot of the movie.
  * Actors in the movie.
  
  *Note: If you do not enter a movie title, you will get one picked for you! It's a good one!
  
  ### node liri do-what-it-says

Using the text within the random.txt file, LIRI will call it's command.
* Currently, the command is **spotify-this-song,"I want it that way"**
* Change it to **movie-this,("Movie Title")** to utilize OMDB.
  
  
