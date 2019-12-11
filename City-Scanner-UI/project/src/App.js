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
import Details_housing from "./Details_housing";
import EventDetails from "./EventDetails";
import Details_restaurant from "./Details_restaurant"
import Details_places from "./Details_places"
import Map2 from "./Map2";

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/Map" component={Map} />
          <Route exact path="/Map2" component={Map2} />
          <Route exact path="/temp" component={temp} />
          <Route exact path="/Restaurants" component={Restaurants} />
          <Route exact path="/Places" component={Places} />
          <Route exact path="/Home" component={Home} />
          <Route exact path="/Dashboard" component={Dashboard} />
          <Route exact path="/Dashcards" component={MediaCard} />
          <Route exact path="/Flip" component={Flip} />
          <Route exact path="/Housing" component={Housing} />
          <Route exact path="/HousingDetails" component={Details_housing} />
          <Route exact path="/RestaurantDetails" component={Details_restaurant} />
          <Route exact path="/PlacesDetails" component={Details_places} />
          <Route exact path="/Events" component={Events} />
          <Route exact path="/EventDetails" component={EventDetails} />


          {/*<Footer />*/}
        </Router>
      </>
    );
  }
}

export default App;
