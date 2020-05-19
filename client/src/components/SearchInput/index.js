import React, { Component } from "react";
import Review from "../Review";
import $ from "jquery";
import axios from 'axios';

class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
        movies: [],
        movieDetail: [],
    };  
  }
  keyPressed(event,myThis) {

    let _search = $("#searchInput").val()

    if(_search.length > 3) {
      myThis.searchMovie(_search);
    }
  }
  searchMovie = (movieTitle) => {
    if($("#emoji1") != null) {
        $("#emoji1").remove();
    }
    $("#showEmoji").empty();
    $("#inputField").val("");
    axios.get(
        "https://www.omdbapi.com/?s=" + movieTitle + "&apikey=trilogy"
      ).then( (response) => {
        if(response.data.Search != null) {
            var movies = [];   
            for(var i=0; i< response.data.Search.length; i++){ 

                movies[i]={
                  title: response.data.Search[i].Title,
                  poster: response.data.Search[i].Poster,
                  year: response.data.Search[i].Year,
                  imdbID: response.data.Search[i].imdbID,
                  type: response.data.Search[i].Type
                }
            
            }
            
            console.log('movies = '+movies.length);
            this.setState({
                movies: movies,
                movieDetail: [],
            });
        }
      });
}
getRottenTomatoesRating = (response) => {
    for(var i = 0; i < response.data.Ratings.length; i++) {
        if (response.data.Ratings[i].Source == "Rotten Tomatoes") {
            return response.data.Ratings[i].Value;
        } 
        
    }
    return "N/A";
}

getMovieDetails = (movie) => {
    var myThis = this;
    var year = movie.year.replace("–"," ");
    var url1 = "/api/trailers/" + movie.title + " "+movie.type + " " + year;
    console.log("url " + url1);
    axios({ method: "get", url: "/api/trailers/" + movie.title + " "+movie.type + " " + year}).then(function(youtubeData){

                movie.trailer = youtubeData.data.result;
                myThis.getMovieDetailFromOmdb(movie, myThis);
                
            });
}
getMovieDetailFromOmdb = (movie, myThis) => {
  axios.get(
    "https://www.omdbapi.com/?i=" + movie.imdbID + "&apikey=trilogy"
  ).then( (response) => {
    if(response.data != null && response.data.Title != null) {
        var genre = response.data.Genre;
        if(genre.indexOf(",") >= 0) {
            genre = genre.substring(0,genre.indexOf(","));
        }
        var rating = this.getRottenTomatoesRating(response);
            movie.title= response.data.Title;
            movie.poster= response.data.Poster;
            movie.plot= response.data.Plot;
            movie.genre= genre;
            movie.runtime= response.data.Runtime;
            movie.rated= response.data.Rated;
            movie.year= response.data.Year;
            movie.rating= response.data.imdbRating;
            movie.ratingrt= rating;
            movie.imdbID= response.data.imdbID;
            movie.Type= response.data.Type;

      } 
      myThis.setState({ movieDetail: [movie]});  
      
      });

}
componentDidUpdate() {
  if(this.state.movieDetail.length > 0) {
    $('#launch-modal').click();
  }
  
}
drag = (ev) => {
    ev.dataTransfer.setData("text", "movie-from-search");
}


closeTrailer = (myThis) => {
  myThis.setState({ movieDetail: []});
}

  render(){

    const movieItems = this.state.movies;
    if (movieItems.length < 10){
      for (var i = movieItems.length; i < 10; i++){
        movieItems[i]={         
            title: '',
            poster: '',
            year: '',
            imdbID: '',
            type: '',
        }
      }
    }

    return (
      <>
      <div className="search-input">
        <input type="text" id="searchInput" className="inputs" placeholder="Search Here"  onKeyUp={(event) => {this.keyPressed(event,this)}}/>
      </div>
      <button id="launch-modal" style={{display: 'none'}} type="button" class="btn btn-primary" data-toggle="modal" data-target="#mModal">Hidden</button>
      <div id = 'motion-container'>
      {movieItems[0] != null
        ? 
      <div id = 'search-result-container'>
       
        <div check = {movieItems[0].title} id = 'search-item-1' className = 'search-results'>
          <h1 className = 'search-title'>{movieItems[0].title}</h1>
          <p className = 'search-year'>{movieItems[0].year}</p>
          <img onClick={() => {this.getMovieDetails(movieItems[0])}} className = 'search-poster' src = {movieItems[0].poster} alt = '1'></img>
        </div>
        <div check = {movieItems[1].title} id = 'search-item-2' className = 'search-results'>
        <h1 className = 'search-title'>{movieItems[1].title}</h1>
          <p className = 'search-year'>{movieItems[1].year}</p>
          <img onClick={() => {this.getMovieDetails(movieItems[1])}} className = 'search-poster' src = {movieItems[1].poster} alt = '2'></img>
        </div>
        <div check = {movieItems[2].title} id = 'search-item-3' className = 'search-results'>
        <h1 className = 'search-title'>{movieItems[2].title}</h1>
          <p className = 'search-year'>{movieItems[2].year}</p>
          <img onClick={() => {this.getMovieDetails(movieItems[2])}} className = 'search-poster' src = {movieItems[2].poster} alt = '3'></img>
        </div>
        <div check = {movieItems[3].title} id = 'search-item-4' className = 'search-results'>
        <h1 className = 'search-title'>{movieItems[3].title}</h1>
          <p className = 'search-year'>{movieItems[3].year}</p>
          <img onClick={() => {this.getMovieDetails(movieItems[3])}} className = 'search-poster' src = {movieItems[3].poster} alt = '4'></img>
        </div>
        <div check = {movieItems[4].title} id = 'search-item-5' className = 'search-results'>
        <h1 className = 'search-title'>{movieItems[4].title}</h1>
          <p className = 'search-year'>{movieItems[4].year}</p>
          <img onClick={() => {this.getMovieDetails(movieItems[4])}} className = 'search-poster' src = {movieItems[4].poster} alt = '5'></img>
        </div>
        <div check = {movieItems[5].title} id = 'search-item-6' className = 'search-results'>
        <h1 className = 'search-title'>{movieItems[5].title}</h1>
          <p className = 'search-year'>{movieItems[5].year}</p>
          <img onClick={() => {this.getMovieDetails(movieItems[5])}} className = 'search-poster' src = {movieItems[5].poster} alt = '6'></img>
        </div>
        <div check = {movieItems[6].title} id = 'search-item-7' className = 'search-results'>
        <h1 className = 'search-title'>{movieItems[6].title}</h1>
          <p className = 'search-year'>{movieItems[6].year}</p>
          <img onClick={() => {this.getMovieDetails(movieItems[6])}}  className = 'search-poster' src = {movieItems[6].poster} alt = '7'></img>
        </div>
        <div check = {movieItems[7].title} id = 'search-item-8' className = 'search-results'>
        <h1 className = 'search-title'>{movieItems[7].title}</h1>
          <p className = 'search-year'>{movieItems[7].year}</p>
          <img onClick={() => {this.getMovieDetails(movieItems[7])}} className = 'search-poster' src = {movieItems[7].poster} alt = '8'></img>
        </div>
        <div check = {movieItems[8].title}  id = 'search-item-9' className = 'search-results'>
        <h1 className = 'search-title'>{movieItems[8].title}</h1>
          <p className = 'search-year'>{movieItems[8].year}</p>
          <img onClick={() => {this.getMovieDetails(movieItems[8])}} className = 'search-poster' src = {movieItems[8].poster} alt = '9'></img>
        </div>
        <div check = {movieItems[9].title}id = 'search-item-10' className = 'search-results'>
        <h1 className = 'search-title'>{movieItems[9].title}</h1>
          <p className = 'search-year'>{movieItems[9].year}</p>
          <img onClick={() => {this.getMovieDetails(movieItems[9])}} className = 'search-poster' src = {movieItems[9].poster} alt = '10'></img>
        </div>
        
        
      </div>
      :
      <div></div>
      }
      </div>

      {
          this.state.movieDetail.map((value,index) => {
              return <div className="modal show modal-container row" id="mModal" data-show="true" role="dialog">
                      <div className="modal-dialog modal-lg modal-xl modal-xs" role="document">
                        <div className="modal-content"> 
                          
                          <div className="modal-body searchV">
                            
                              <div  onDragStart={this.drag} className = 'row'>
                                <div className = ' movie-frames col-12'>
                                <a onClick={() => {this.closeTrailer(this)}}  className="close" data-dismiss="modal" aria-label="Close">
                                <i class="fas fa-power-off"></i>
                              </a>
                                  <iframe  id="movie-trailer" className="movie-frames d-block " src={"https://www.youtube.com/embed/"+value.trailer+"?rel=0"} frameborder="0"></iframe>
                                  <div className= "movie-frames-detail">
                                    <h5 class="mb-1 " style={{ 'text-align': 'left'}} >{value.title}</h5>
                                      <small>{value.rated} | {value.runtime} | {value.genre} | {value.year}  </small>
                                      <br />
                                      <small>Rotten Tomatoes: {value.ratingrt} | IMDB: {value.rating}</small>
                                  </div>
                                  <div>
                                    
                                    <button className=" drop-down-button btn" type="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    I would ... &nbsp;&nbsp;
                                    <i class="fas fa-plus"></i>
                                    </button>
                                      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                      <div className="dropdown-item" data-dismiss="modal" aria-label="Close" onClick={() => {this.props.cb("cat1")}}>Say it's a waste of time</div>
                                      <div className="dropdown-item" data-dismiss="modal" aria-label="Close" onClick={() => {this.props.cb("cat2")}}>Watch a summary of it on YouTube</div>
                                      <div className="dropdown-item" data-dismiss="modal" aria-label="Close" onClick={() => {this.props.cb("cat3")}}>Eventually watch it when it comes on DVD/BluRay</div>
                                      <div className="dropdown-item" data-dismiss="modal" aria-label="Close" onClick={() => {this.props.cb("cat4")}}>Watch at a local theater</div>
                                      <div className="dropdown-item" data-dismiss="modal" aria-label="Close" onClick={() => {this.props.cb("cat5")}}>Get a subscription for it</div>
                                    </div>
                                  </div>
                                </div>
                                <div id="genre" className="d-none ">{value.genre}</div>
                                <div id="runtime" className="d-none ">{value.runtime}</div>
                                <div id="rated" className="d-none ">{value.rated}</div>
                                <div id="title" className="d-none ">{value.title}</div>
                                <div id="plot" className="d-none ">{value.plot}</div>
                                <div id="year" className="d-none ">{value.year}</div>
                                <div id="poster" className="d-none ">{value.poster}</div>
                                <div id="rating" className="d-none ">{value.rating}</div>
                                <div id="ratingrt" className="d-none ">{value.ratingrt}</div>
                              </div>
                              <br></br>
                              <Review />
                            
                          </div>
                        </div>
                      </div>
                    </div>
          
          })
      }
      
      
    </>
    );
  }
  
}

export default SearchInput;
