import React, { Component } from "react";
import { HashRouter as Router, Route, Link, NavLink } from "react-router-dom";
import Home from "./Home";
import Footer from "./Footer";
import Header from "./Header"

import "./App.css";
import { Navbar } from "./Header";

class App extends Component {
  render() {
    return (
      <>
        <Header/>
        <Home/>
        <Footer/>
      </>
     );
  }
}

export default App;
