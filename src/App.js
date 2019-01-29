/* Use the src/App.js file as your main container component,
 where you should import your .config file.*/

 import React, { Component } from "react"; // import React
 import "./css/index.css"; //import css styles
 import axios from "axios";
 import apiKey from "./config"; //import config file
 import {
   //import BrowserRouter and Route
   BrowserRouter,
   Route,
   Switch
 } from "react-router-dom";
 
 //import components
 import Header from "./Components/Header"; //after exporting Header ,import Header component into this file
 import Gallery from "./Components/Gallery";
 import NotFound from "./Components/NotFound";
 import Home from "./Components/Home"; //the reason I built a home component was so that I could avoid getting an error on the <Switch>, I needed  component to exactly match the / url 
 import Search from "./Components/Search";

 
 class App extends Component { //Class components need to extend  React.Component, and class components require the render()
   constructor() {
     //state for data we want to display from flickr
     super();
     this.state = {
       pics: [], //this array will hold the pictures of pics,dogs,computers,cats that will render as soon as the page loads
       cats: [],
       dogs: [],
       computers: [],
       loading: true
     };
   }
 
   componentDidMount() {
     this.performSearch(); //call performSearch(), .renderCats(), renderDogs(), renderComputers()  on the componentDidMount() life cycle
     this.renderCats();
     this.renderDogs();
     this.renderComputers();
   }
 
   //this function will create the search feature
   performSearch = (query = "random") => {
     //include a query parameter so that flickr can return images based on user input, and provide a default value for query parameter to display sunset pics when the page first loads
     //fetch data from flickr
     axios 
       .get(
         `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
       )
       .then(response => { //set the response so that pics will be equal to the data array containing photos from flickr
        console.log(response)
         this.setState({
           pics: response.data.photos.photo, 
           loading: false //initialize a loading state to display a loading message
         });
       })
       .catch(error => { //this catch method outputs a message to the console, should axios fail to retrieve data
         console.log("Something went wrong, could not access data", error);
       });
   }; 

   //this function will retrieve the CATS pictures

   renderCats = () => {
    //fetch data from flickr
    axios 
      .get(
        ` https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`
      )
      .then(response => { //set the response so that pics will be equal to the data array containing cat photos from flickr
        console.log(response)
        this.setState({
          cats: response.data.photos.photo, 
          loading: false //initialize a loading state to display a loading message
        });
      })
      .catch(error => { //this catch method outputs a message to the console, should axios fail to retrieve data
        console.log("Something went wrong, could not access data", error);
      });
  }; 

  //this function will retrieve the DOGS pictures

  renderDogs = () => {
    //fetch data from flickr
    axios 
      .get(
        ` https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`
      )
      .then(response => { //set the response so that pics will be equal to the data array containing dog photos from flickr
        console.log(response)
        this.setState({
          dogs: response.data.photos.photo, 
          loading: false //initialize a loading state to display a loading message
        });
      })
      .catch(error => { //this catch method outputs a message to the console, should axios fail to retrieve data
        console.log("Something went wrong, could not access data", error);
      });
  }; 

  //this function will retrieve the Computer pictures

  renderComputers = () => {
    //fetch data from flickr
    axios 
      .get(
        ` https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=laptops&per_page=24&format=json&nojsoncallback=1`
      )
      .then(response => { //set the response so that pics will be equal to the data array containing computer photos from flickr
        console.log(response)
        this.setState({
          computers: response.data.photos.photo, 
          loading: false //initialize a loading state to display a loading message
        });
      })
      .catch(error => { //this catch method outputs a message to the console, should axios fail to retrieve data
        console.log("Something went wrong, could not access data", error);
      });
  }; 
 
   render() { // I used a code snippet from Josue https://stackoverflow.com/a/54319021/10043628
    //  console.log(this.state.pics);
     return (
       //JSX inside ()
       <BrowserRouter>
         <div>
           {/* Pass the performSearch function as a prop down to Header  so that I can pass it to Form component located inside Header to enable searches*/}
           <Header onSearch={this.performSearch} /> 
            <div className="photo-container">
             <h2>Results</h2>
             <Switch> 
             {/* <Route path="/" component={App} /> */}
             <Route exact path="/" Component={Home} /> } /> {/*Having a Home( / ) path avoids the NotFound component from rendering*/}
             <Route exact path="/cats" render={ () => <Gallery data={this.state.cats} /> } />  {/*use Route path and render to display Cats,Dogs and Computer components when the url matches  */}
             <Route exact path="/dogs" render={ () => <Gallery data={this.state.dogs} /> } /> 
             <Route exact path="/computer" render={ () => <Gallery data={this.state.computers} /> } /> 
             <Route exact path="/search" render={ () => <Search data={this.state.pics} /> } /> 
             <Route exact path="/search" component={ () => <Search onSearch={this.performSearch} /> } /> 
             <Route exact component={NotFound}/> {/*render NotFound component */}
             </Switch > 
             {
               (this.state.loading)
               ? <h1>Loading Photos...</h1> //if the loading state is true,I'll render a h1
               :  <Gallery data={this.state.pics} /> //otherwise if loading is false, render Gallery component, also pass a data props containing this.state.pics to Gallery component
             }
            
           
            </div>          
         </div>
       </BrowserRouter>
     );
   }
 } //closes App
 
 export default App;
 