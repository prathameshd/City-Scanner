import React, { Component } from "react";
import Home from "./Home";
import Footer from "./Footer";
import Header from "./Header"
import CitiesSlider from "./CitiesSlider";

import "./App.css";

class App extends Component {
  render() {
    return (
      <>
        <Header/>
        <CitiesSlider/>
        <Home/>
        <Footer/>
      </>
     );
  }
}

export default App;
