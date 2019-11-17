import React, { Component } from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";

export default class Flip extends Component {
  render() {
    return (
      <div className="flipping-cards">
        <div className="cards">
          <Flippy
            flipOnHover={true}
            // flipOnClick={true}
            flipDirection="horizontal"
            ref={r => (this.flippy = r)}
            style={{ width: "290px", height: "200px", margin: "10px" }}
          >
            <FrontSide
              style={{
                backgroundColor: "#FE6B8B"
              }}
            >
              <h2>Restaurants</h2>
              <i class="fas fa-utensils fa-4x"></i>
            </FrontSide>
            <BackSide style={{ backgroundColor: "#FFF9C4" }}>
              sdvmKSFMgmdfomvl
            </BackSide>
          </Flippy>
        </div>
        <div className="cards">
          <Flippy
            flipOnHover={true}
            // flipOnClick={true}
            flipDirection="horizontal"
            ref={r => (this.flippy = r)}
            style={{ width: "290px", height: "200px", margin: "10px" }}
          >
            <FrontSide
              style={{
                backgroundColor: "#17a2b8"
              }}
            >
              <h2>Housing</h2>
              <i class="fas fa-home fa-4x"></i>
            </FrontSide>
            <BackSide style={{ backgroundColor: "#FFF9C4" }}>
              sdvmKSFMgmdfomvl
            </BackSide>
          </Flippy>
        </div>
        <div className="cards">
          <Flippy
            flipOnHover={true}
            // flipOnClick={true}
            flipDirection="horizontal"
            ref={r => (this.flippy = r)}
            style={{ width: "290px", height: "200px", margin: "10px" }}
          >
            <FrontSide
              style={{
                backgroundColor: "#FF8E53"
              }}
            >
              <h2>Tourist Spots</h2>
              <i class="fas fa-map-marked-alt fa-4x"></i>
            </FrontSide>
            <BackSide style={{ backgroundColor: "#FFF9C4" }}>
              sdvmKSFMgmdfomvl
            </BackSide>
          </Flippy>
        </div>
        <div className="cards">
          <Flippy
            flipOnHover={true}
            // flipOnClick={true}
            flipDirection="horizontal"
            ref={r => (this.flippy = r)}
            style={{ width: "290px", height: "200px", margin: "10px" }}
          >
            <FrontSide
              style={{
                backgroundColor: "#8a2be2"
              }}
            >
              <h2>Events</h2>
              <i class="fas fa-coffee fa-4x"></i>
            </FrontSide>
            <BackSide style={{ backgroundColor: "#FFF9C4" }}>
              sdvmKSFMgmdfomvl
            </BackSide>
          </Flippy>
        </div>
      </div>
    );
  }
}
