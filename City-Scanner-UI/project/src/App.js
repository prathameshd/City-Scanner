import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from "./Home";
import Footer from "./Footer";
import Header from "./Header"
import CitiesSlider from "./CitiesSlider";
import temp from "./temp";
import Dashboard from "./Components/Dashboard";

import "./App.css";

class App extends Component {
  render() {
    return (
      <>
      <Router>

        <Header/>
                  <Route exact path="/" component={Home} />
      
                  <Route exact path="/temp" component={temp} />
                  <Route exact path="/home" component={Home} />
                              <Route exact path="/Dashboard" component={Dashboard}></Route>


  
      
        <Footer/>
      </Router>
      </>
     );
  }
}

export default App;
