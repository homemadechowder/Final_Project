var express = require("express");
var router = express.Router();
var Crypto = require('crypto-js');
var $ = require("jquery");
const https = require('https');
const axios = require("axios");


var movie = require("../../models/movie.js");
const moviesController = require("../../controllers/moviesController");
const usersController = require("../../controllers/usersController");
const shareableLinksController = require("../../controllers/shareableLinksController");


// Save Movies pertaining to a user API
// Save movies in MognoDB for a user 
router.post("/api/:user/movies", function(req, res) {
    
    var condition = {email: req.body.email};
    usersController.findAll(condition,function(result) {
        if(result.length > 0) {
            req.body.userid = result[0]._id;
            delete req.body.email;
            moviesController.create(req,res);
        } else {
            res.json({result: "failure"});
        }
    }, function(err) {console.log(err)});
    
});


// Fetch Movies pertaining to a user and a given category API
// Returns movies for a given user and category (fetches from MongoDB)
router.get("/api/:email/movies/:cat", function(req, res) {
    var condition = {email: req.params.email};
    var userid = null;
    usersController.findAll(condition,function(result) {
        if(result.length > 0) {
            req.body.userid = result[0]._id;
            userid = result[0]._id;
            delete req.body.email;
            condition = {category: req.params.cat, userid: req.body.userid};
            moviesController.findAll(condition,function(result) {
                getShareableLinks(result,userid,req.params.cat,req,res);
            });
        } else {
            res.json({result: "failure"});
        }
    }, function(err) {console.log(err)});
});
//get all the sharable links for the given user and category
function getShareableLinks(movies,userid,category,req,res) {
    var condition = "";
    var totalMovies = {total: 0};
    condition = {userid: userid, category: category};
        shareableLinksController.findAll(condition,function(links) {
            
            res.json({movies: movies, links: links});
            
        }, function(err) {
            console.log(err);
            res.json(movies);
        });
    
   
}

// Delete Movie API
// Deletes a movie from MongoDB store for a given user and movie-id
router.delete("/api/:email/movies/:id", function(req, res) {
    
    moviesController.remove(req,res);
        
});



//Get Trending Movies API
//Returns latest trending movies from Rotten Tomatoes website (scraping from rotten tomatoes website)
router.get("/api/trending-movies", function(req, res) {
    getTrendingMovies(req,res);
});

//Returns latest trending movies from Rotten Tomatoes website (scraping from rotten tomatoes website)
function getTrendingMovies(req,res1) {
    var trendingMovies = [];
    var movieCount = {total: 10};
    
    //Get movie list from rottentomatoes
    axios({method: "get", url: "https://www.rottentomatoes.com/browse/in-theaters/"}).then( function(res,status) {
        res = res.data;
        var index1 = res.indexOf('var loadPage = (function(adPromise)');
        var index2 = res.indexOf('[{"id":',index1);
        var index3 = res.indexOf(']}]', index2);
        var movies = res.substring(index2, index3+4);
        var movieData = JSON.parse(res.substring(index2,index3+3));
        if(movieData.length < movieCount.total) {
            movieCount.total = movieData.length;
        }
        //Go after top 5 movies
        for(var i = 0, j = 0; i < movieData.length; i++) {
            var movie = movieData[i];
            console.log(movieData);
            if (Object.keys(movie).includes("title")) {
                    j++;
                    getMovieImage(req,res1,trendingMovies, movie, movieCount);
                    console.log("check");
                
            } else {
                movieCount.total--;
            }
            if(j >= movieCount.total) {
                break;
            }
            
            
        }
    });
}

//Returns the image/poster for a movie (scraping from rotten tomatoes website - looking for 740x290 resolution image url)
function getMovieImage(req, res1, trendingMovies, movie, movieCount) {
    axios({ method: "get", url: "https://www.rottentomatoes.com" + movie.url }).then(function(movieDetails){

                var index1 = movieDetails.data.indexOf('application/ld+json">');
                var index2 = movieDetails.data.indexOf("</script>", index1);
                var movieTrailer = JSON.parse(movieDetails.data.substring(index1+21, index2));
                movie.image = movieTrailer.image;
                if(movie.image.indexOf("740x290") >= 0) {
                    trendingMovies.push({ movie: movie, youtubeId: movieTrailer});
                    if(trendingMovies.length >= movieCount.total) {
                        res1.json({result: trendingMovies});
                    }
                } else {
                    movieCount.total = movieCount.total - 1;
                    if(trendingMovies.length >= movieCount.total) {
                        res1.json({result: trendingMovies});
                    }
                }

            });

}


//Returns youtube video clip id for a movie/tv (scraping from youtube website)
function getYoutubeTrailer(req,res1, trendingMovies, movie) {
    axios({ method: "get", url: "https://www.youtube.com/results?search_query=" + movie.title + " trailer", responseType: "text"}).then(function(youtubeData){

                var index = youtubeData.data.indexOf("yt-lockup-video");
                var index = youtubeData.data.indexOf("https://i.ytimg.com/vi", index);
                var movieTrailer = youtubeData.data.substring(index+23, youtubeData.data.indexOf("/", index+23));
                trendingMovies.push({ movie: movie, youtubeId: movieTrailer});
                if(trendingMovies.length >= 10) {
                    res1.json({result: trendingMovies});
                }

            });
}


// Movie trailer API
// Returns movie trailer video from youtube (scraping from youtube website)
router.get("/api/trailers/:title", function(req, res) {
    axios({ method: "get", url: "https://www.youtube.com/results?search_query=" + req.params.title , responseType: "text"}).then(function(youtubeData){

        var index = youtubeData.data.indexOf("yt-lockup-video");
        var index = youtubeData.data.indexOf("https://i.ytimg.com/vi", index);
        var movieTrailer = youtubeData.data.substring(index+23, youtubeData.data.indexOf("/", index+23));
        
        res.json({result: movieTrailer});

    });
});

//Trending TV API
// Returns latest trending TV shows (scraping from rotten tomatoes website)
router.get("/api/trending-tv", function(req, res) {
    getTrendingTV(req,res);
});

// Returns latest trending TV shows (scraping from rotten tomatoes website)
function getTrendingTV(req,res1) {
    var trendingMovies = [];
    //Get movie list from rottentomatoes
    axios({method: "get", url: "https://www.rottentomatoes.com/browse/tv-list-2"}).then( function(res,status) {
        res = res.data;
        var index1 = res.indexOf('var loadPage = (function(adPromise)');
        var index2 = res.indexOf('[{"title":',index1);
        var index3 = res.indexOf('}]', index2);
        var movies = res.substring(index2, index3+3);
        var movieData = JSON.parse(res.substring(index2,index3+2));
        
        // Go after top 5 movies
        for(var i = 0; i < 10; i++) {
            var movie = movieData[i];
            
            getYoutubeTrailer(req,res1,trendingMovies, movie);
            
        }
        
    });
}



// Export routes for server.js to use.
module.exports = router;
