import React, {Component} from 'react';
import $ from 'jquery';


class BannerCard extends Component{
    
    
    constructor(props) {
        super(props);
        this.state = {
            link: '',
        };
    }

    componentDidMount() {
        ;
    }

    showMovie = (id) => {
        $(id).show();
    }

    getLink = () => {
        // this.setState({link: this.props.movie.mainTrailer.sourceId});  
    }

    enableControls = (id, index) => {
        $(".containerBanner" + index).css('z-index','145');
        $(id).attr("controls",true);
        $(id).css('z-index','145');
    }
    
    disableControls = (id, index) => {
        $(".containerBanner" + index).css('z-index','-1');
        $(id).attr("controls",false);
        $(id).css('z-index','-1');
    }


    movieContent = () => {
        return (
            
            <div  onMouseLeave={() => {this.disableControls(".movie-image" + this.props.index, this.props.index)} } onMouseEnter={() => {this.enableControls(".movie-image" + this.props.index, this.props.index)} } id={"movie-image-container" + this.props.index} className={"col-mb-4 movie-image-container" + " movie-image-container" + this.props.index}>

                <img id={"movie-image" + this.props.index} className={"movie-image-trending " + "movie-image" + this.props.index} src={this.props.movie.image} alt = {this.props.index}>
                </img>
                <div onClick = {()=>this.props.getLink(this.props.movie.mainTrailer.sourceId)} index={this.props.index} id={"overlayBanner" + this.props.index} className={"col-mb-8 overlayBanner" + " overlayBanner" + this.props.index}>
                
                    <div ></div>
                  
                    <div id={"title" + this.props.index} className="title color-white">
                        <p>{this.props.movie.title}</p>
                    </div>
                     
                    
                    <div className = "items director">
                        <p className="old">Director: <strong>{this.props.youtubeId.director[0].name} </strong></p>
                        <p className="new">Release Year: <strong>{this.props.movie.theaterReleaseDate} 2020</strong></p>
                        <p className = 'genre'>Genre: <strong>{this.props.youtubeId.genre[0]} </strong></p>
                       
                    </div>                 
                    
                    <div className="items cart">
                        <i className="fas fa-cart-arrow-down"></i>
                        <span>SAVE and RATE</span>
                    </div>
                    
                    <div className = 'synopsis'>
                       {this.props.movie.synopsis}
                    </div>
                </div>

                
            </div>          
        )
    }

    tvContent = () => {
        return <div className={"col-mb-4 tv-image-container" + " tv-image-container" + this.props.index}>
                <img className="tv-image-trending" src={this.props.movie.posters.primary}/>
                <div onClick = {()=>this.props.getLink("https://www.youtube.com/embed/"+this.props.youtubeId + '?autoplay=1&mute=1')}index={this.props.index} id={"overlayBanner" + this.props.index} className={"col-mb-8 overlayBanner" + " overlayBanner" + this.props.index}>
                
                    <div ></div>
                  
                    <div id={"title" + this.props.index} className="title color-white">
                        <p>{this.props.movie.title}</p>
                        <hr></hr>
                    </div>

                    <div className="items cart">
                        <i className="fas fa-cart-arrow-down"></i>
                        <span>SAVE and RATE</span>
                    </div>
                </div>
                </div>
                // </div>
    }

    resizeImageContainer = (id) => {
        $(id).attr("controls",true);
    }
    
    
    render(){
        return(
            <div>
            <div className={"row containerBanner" + " containerBanner" + this.props.index} data-id={this.props.movie.id} >
                
                {this.props.mediatype == "movie" ? this.movieContent() : this.tvContent()}
                
            </div>
            </div>
        )
    }
}

export default BannerCard;