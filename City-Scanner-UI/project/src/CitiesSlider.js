import React, { Component } from "react";
import { Fade } from "react-slideshow-image";
import SearchBar from "./Components/SearchBar";

const fadeProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  onChange: (oldIndex, newIndex) => {
    console.log(`fade transition from ${oldIndex} to ${newIndex}`);
  }
};

class CitiesSlider extends Component {
  render() {
    return (
      <div className="slide-container">
        <div class="center-search-bar">
          <SearchBar />
        </div>
        <Fade {...fadeProperties}>
          <div className="each-fade">
            <div className="image-container">
            <h1 style={{top:150,left:350,color:'white',position:'absolute'}}>lets get started..</h1>
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/singapore.jpg"
                height="555"
                width="1550"
              />
            </div>
          </div>
          <div className="each-fade">
            <div className="image-container">
                        <h1 style={{top:150,left:350,color:'black',position:'absolute'}}>find places to stay</h1>
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/prague.jpg"
                height="555"
                width="1550"
              />
            </div>
          </div>
          <div className="each-fade">
            <div className="image-container">
                                    <h1 style={{top:150,left:350,color:'#8B008B',position:'absolute'}}>explore events around town</h1>
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/paris.jpg"
                height="555"
                width="1550"
              />
            </div>
          </div>
          <div className="each-fade">
            <div className="image-container">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/amsterdam.jpg"
                height="555"
                width="1550"
              />
            </div>
          </div>
          <div className="each-fade">
            <div className="image-container">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/moscow.jpg"
                height="555"
                width="1550"
              />
            </div>
          </div>
        </Fade>
      </div>
    );
  }
}

export default CitiesSlider;
