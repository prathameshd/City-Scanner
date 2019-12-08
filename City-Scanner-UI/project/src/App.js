import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Home";
//import Footer from "./Footer";
import Header from "./Header";
import temp from "./temp";
import Dashboard from "./Dashboard";
import Restaurants from "./Restaurants";
import Map from "./Map";
import "./App.css";
import Flip from "./Flip";
import MediaCard from "./Dashcards";
import Places from "./Places";
import Housing from "./Housing";
import Events from "./Events";
import Details_Housing from "./Details_housing";
import Details_Restaurant from "./Details_restaurants";
import Details_Place from "./Details_places";
import ShareForm from "./Share";
import NameForm from "./Share_Resources"
class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/Map" component={Map} />

          <Route exact path="/temp" component={temp} />
          <Route exact path="/Restaurants" component={Restaurants} />
          <Route exact path="/Places" component={Places} />
          <Route exact path="/Home" component={Home} />
          <Route exact path="/Dashboard" component={Dashboard} />
          <Route exact path="/Dashcards" component={MediaCard} />
          <Route exact path="/Flip" component={Flip} />
          <Route exact path="/Housing" component={Housing} />
          <Route exact path="/HousingDetails" component={Details_Housing} />
          <Route exact path="/RestaurantDetails" component={Details_Restaurant}/>
          <Route exact path="/PlaceDetails" component={Details_Place}/>
          <Route exact path="/Events" component={Events} />


          {/*<Footer />*/}
        </Router>
        {/*<NameForm/>*/}
      </>
    );
  }
}

export default App;
