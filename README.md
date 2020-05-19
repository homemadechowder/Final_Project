# Project-03

### Heroku link: https://askk-movies.herokuapp.com/
#### Test username/password: askk@askk.com  and password: Askk!123

This application is a movie and TV show compendium. It showcases latest trending movies and TV shows. It provides personalized experience by allowing users to create an account and access it with their login credentials. It lets them search for movies or TV shows and save their personal comments and ratings to these movies/TV shows. Users can also share their content with friends and family in social media.

## Table of contents
1. [How the APP works](#howitworks)
2. [Technologies Used](#tech)
3. [Applications Used](#app)
4. [Wireframe Design](#wire)
5. [User Story Breakdown](#user)
6. [Task Breakdowns](#task)
7. [UI Design](#UI)
8. [How We Implemented React Carousel Component](#reactcarousel)
9. [How We Implemented React Sharing Component](#reactsharing)
10. [How We Implemented React Bucketing Component](#reactbucket)
11. [How We Implemented z Index](#zIndex)
12. [Mobile Responsiveness](#mobile)
13. [API Design, Firebase, Libraries](#design)
14. [Git Commands](#git)
15. [DEMO Gif Walkthrough](#gifs)
16. [Future RoadMap](#future)
17. [Team memeber GIT Links](#team)
18. [Code Snippets](#code)

<a name="howitworks"></a>
## 1. How the APP works

The landing page of the application showcases carousels for latest trending movies and TV shows. User can click on the movies to checkout the trailers of the movies they selected by clicking on it. 

<a name="tech"></a>
## Technologies Used
HTML
Javascript/jQuery
MongoDB
APIs 
Bootstrap
AJAX
JSON
React
Heroku

<a name="app"></a>
## Applications Used
GitHub
ChromeDev tools
Visual Studio Code
Chrome browser
Heroku - Deployment

<a name="wire"></a>
## Wireframe Design

![WireFrame Design](https://github.com/homemadechowder/Final_Project/blob/master/client/public/Images/wireframe-1.png "WireFrame Design 1")
![WireFrame Design](https://github.com/homemadechowder/Final_Project/blob/master/client/public/Images/wireframe-2.png "WireFrame Design 2")

<a name="user"></a>
## User Story Breakdown
User Story 1: Create a website with necessary hooks for building the backend functionality

User Story 2: Add Bootstrap for mobile responsivness

User Story 3: Add OMDI API functionality

User Story 4: Add Trending functionality

User Story 5: Sign in and register with Google Sign-in

User Story 6: Scrape from Rotten Tomatoes

User Story 7: Add Social platform sharing 

User Story 7: Bucket functionality for saving movies/Tv shows

User Story 8: REACT front end

User Story 9: API Routes

User Story 10: REACT Bucket pages 

<a name="task"></a>
## Task Breakdowns
Krishna (Sharing via social media/ Movie Search)
Andrew (UI Design/Front-end/Javascript & Server set up/Routing)
Sree (Back-end /Front-end/ Authentication)
Katia (Front-end/UI Design/Mobile Responsiveness )

<a name="UI"></a>
## UI Design

![UI Design Progression](https://github.com/homemadechowder/Final_Project/blob/master/client/public/Images/UI%20Layout.gif "UI Design Layout 1")


## How We Implemented Carousel Component

An npm package that lets you set up a reasonably comprehensive carousel that can contain multiple items

![REACT Carousel](https://github.com/homemadechowder/Final_Project/blob/master/client/public/Images/react-carousel.png "React Carousel")

## How We Implemented React Sharing Component

An npm package that lets you share across social media platform

![REACT Sharing](https://github.com/homemadechowder/Final_Project/blob/master/client/public/Images/Sharing.gif "React Sharing")

## How We Implemented React Bucketing Component

Then “save” selected  movies and TV shows are bucketed into different categories

![REACT Bucket](https://github.com/homemadechowder/Final_Project/blob/master/client/public/Images/Bucket.gif "React Bucket")

## How We Implemented Z-index

z-index comes into play only when the divs are in the same position

Relative, Absolute, Fixed, Sticky(absolute/fixed)

Double check the css property using inspect to see which position it is in or it inherited to prevent confusion. 

Example showing z-index in work

![Z Index Overlay](https://github.com/homemadechowder/Final_Project/blob/master/client/public/Images/z-index-image.png "Z index Overlay")


## Mobile Responsiveness
Accomplished with @media and vw, a scaling unit for mobile, tablet and desktop viewing

![Mobile Responsiveness - 1](https://github.com/homemadechowder/Final_Project/blob/master/client/public/Images/Animated%20GIF-downsized.gif "Mobile Responsiveness - 1")

![Mobile Responsiveness - 2](https://github.com/homemadechowder/Final_Project/blob/master/client/public/Images/Animated%20GIF-downsized_large%202.53.52%20PM.gif "Mobile Responsiveness - 2")

<a name="task"></a>
## Task Breakdowns
1. Andrew - A sleek looking UI using bootstrap and  the website being fully mobile responsive
2. Katia - Mobile responsive, Wireframe design
3. Krishna - Social media sharing, Imporved search results which gets the results based on the search keys enetered by the user.
4. Sree - OAuth sign-in, Registration page logic, modelling, search page (inital design, backend routes and fetching data and rendering component in the browser), saved page (initial design, backend routes to store data and React.js code to fetch and render component)


<a name="design"></a>
## API Design, Libraries

### OMDB API
We used the OMDB API for searching movies (based on a user query)
The results from this search were used to render search results

### Rotten tomatoes
We scraped Rotten tomatoes pages to get latest trending movies and TV shows.
Rotten tomatoes pages included JSON objects for such data. We used this data for our application.

### Youtube videos for trailers
We scraped youtube search pages to get trailers for movies queried by users.


<a name="team"></a>
## Authors - Team members, GIT links
<!-- make a link to the deployed site and have your name as the link -->
* [Andrew](https://github.com/homemadechowder)
* [Katia](https://github.com/katrinity)
* [Krishna](https://github.com/krishnaaddala)
* [Sree](https://github.com/sreeveena/)

<a name="code"></a>
## Appendix for Code Snippets

#### Code for authenticating a user(from browser)

  ```function authUser(email, password, provider){
    var password = {
        password: password,
        provider: provider
    };

    // Send the POST request.
    $.ajax("/api/auth/"+email, {
        type: "POST",
        data: password
        }).then(
        function(res, err) {
            if(res.result == "success"){
                $("#loginModal").modal('hide');
                $(elem).html("");
                checkSession();
            }else{
                var elem=$("#invalidLogin");
                $(elem).html("Please enter a valid email or password.");
                $(elem).css("color", "red");
            }
        }
    );
      }
  ```
#### Code for saving encrypted one-way hash(SHA256) encrypted password

  ``` if(data[0].provider){
          if(data[0].provider && data[0].provider == "events"){
              var encryptedPassword = Crypto.SHA256(req.body.password).toString();
              if( data[0].password == encryptedPassword){
                  req.session.userid = req.params.email;
                  res.json({ result:"success" });
                
             }else{
                
                res.json({ result:"fail" });
            }
        }else{
            req.session.userid = req.params.email;
            res.json({ result:"success" });
        }
    }else{
        res.json({ result:"fail" });
    }

    });
  ```
### Code using references in React.js for communicating between sibling components
```
constructor(props) {
      super(props);
      this.state = {
        menus: []
      };
      this.bucket = React.createRef();
    }
assignCategory = (category) => {
        this.bucket.current.selectACategory(category);
}

render() {
    return (
      <>
          <Nav cb={this.refreshComponent} menus={this.state.menus}/>
          <SearchInput cb={this.assignCategory}/>
          <Bucket ref={this.bucket}/>
      </>
    );
  }

```

#### Code for sharing pages with friends online in social media

```
  <FacebookShareButton  className="d-inline" url={this.getSharableLink(value.link)}>
    <a key = {1} style = {buttonStyle.media} >
      <i style = {{marginLeft: '-.2rem', textAlign: 'center',color: "#4267b2"}} className="fab fa-facebook fa-lg"> </i>
    </a> 
  </FacebookShareButton>
  <TwitterShareButton  className="d-inline" url={this.getSharableLink(value.link)}>
    <a key = {2} style = {buttonStyle.media} >
      <i style = {{marginLeft: '-.2rem', textAlign: 'center',color: '#1DA1F2'}} className="fab fa-twitter fa-lg"> </i>
    </a> 
  </TwitterShareButton>
  <WhatsappShareButton className="d-inline" url={this.getSharableLink(value.link)}>
    <a key = {3 }style = {buttonStyle.media}>
      <i style = {{marginLeft: '-.2rem', textAlign: 'center', color: '#f685ab'}} className="fab fa-whatsapp fa-lg"></i>
    </a>
  </WhatsappShareButton>
```

<a name="git"></a>
## Git commands:

```
    git checkout master
    git checkout -b branchname
    
    *make changes to the files in your branch*
    
    git status
    git add .
    git commit -m "message"
    git push origin master
    
    *Create Pull Request*
    *Merge your code to "master"*
    ```
