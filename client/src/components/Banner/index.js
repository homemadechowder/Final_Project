import React, {Component} from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import BannerCard from '../BannerCard';
import $ from 'jquery';


class Banner extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
        items: '',
        trendingMovies: [],
        trendingTV: [],
        link:''
    };
  } 

  componentDidMount() {
    var compThis = this;
    console.log("fetching trending movies");
        $.ajax({METHOD: "GET", url: "/api/trending-movies"}).then(function (res, status) {    
            console.log("Fetched trending movies" + res); 
            compThis.getTrendingTV(compThis, res.result);       
        }); 
    this.printResults();
  }

  printResults(){
    console.log(this.state.trendingMovies);
    console.log(this.state.trendingTV);
  }

  getTrendingTV = (compThis, movies) => {
    $.ajax({METHOD: "GET", url: "/api/trending-tv"}).then(function (res, status) {       
        compThis.setState({trendingMovies: movies, trendingTV: res.result});      
        this.printResults();
    });
  }

  getLink = (link) =>{
    this.setState({link: link})
  }
  

  
  render(){
        return(
          <div className = 'container'>
          {this.props.mediatype == "movie" ? <h1 className = 'carousel-title'><i class="fas fa-film"></i> Trending Movies </h1> : <h1 className = 'carousel-title'><i class="fas fa-tv"></i> Trending TV Shows </h1>}
          <Carousel
          additionalTransfrom={0}
          responsive = {this.props.responsive}
          direction = {'right'}
          arrows
          autoPlay
          autoPlaySpeed={20000}
          centerMode={false}
          className=""
          containerClass="container-with-dots"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          renderButtonGroupOutside={true}
          renderDotsOutside={true}
          sliderClass=""
          slidesToSlide={2}
          swipeable
          >
          
          {
              this.state[this.props.loadElement].map((value,index) => {
                  if(this.props.loadElement == "trendingMovies") {
                    return <div><BannerCard getLink = {this.props.getLinkAgain} mediatype="movie" index={index} movie={value.movie} youtubeId={value.youtubeId}/></div>
                  } else {
                    return <div><BannerCard getLink = {this.props.getLinkAgain} mediatype="tv" index={index} movie={value.movie} youtubeId={value.youtubeId}/></div>
                  }
                  
              })
          }
          
        </Carousel>
        </div>
        )
    }
}

export default Banner;