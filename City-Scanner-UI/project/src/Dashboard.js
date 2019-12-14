import React, { Component } from "react";
import Rest from "./Restaurants.mp4";
import Events from "./events.mp4";
import Housing from "./housing.mp4";
import Tourist from "./touristSpots.mp4";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import SearchBar from "./Components/SearchBar";

export default class Dashboard extends Component {
  onHover1() {
    this.refs.vidRef1.play();
  }

  onMouseOut1() {
    this.refs.vidRef1.pause();
  }
  onHover2() {
    this.refs.vidRef2.play();
  }

  onMouseOut2() {
    this.refs.vidRef2.pause();
  }
  onHover3() {
    this.refs.vidRef3.play();
  }

  onMouseOut3() {
    this.refs.vidRef3.pause();
  }
  onHover4() {
    this.refs.vidRef4.play();
  }

  onMouseOut4() {
    this.refs.vidRef4.pause();
  }
  render() {
    return (
      <div style={{ width: "100%", overflow: "hidden" }}>
        <AppBar position="relative" color="">
          <div
            className="Toolbar"
            style={{
              position: "relative",
              marginLeft: "25%",
              marginBottom: "1%",
              marginTop: "1%"
            }}
          >
            <SearchBar />
          </div>
        </AppBar>
        <Link to={{ pathname: "/Housing" }}>
          <div
            style={{
              height: "100%",
              flex: "2",
              minHeight: "0",
              float: "left",
              width: "25%",
              opacity: "0.9"
            }}
          >
            <video
              ref="vidRef1"
              loop
              muted
              height="100%"
              onMouseOver={this.onHover1.bind(this)}
              onMouseLeave={this.onMouseOut1.bind(this)}
            >
              <source src={Housing} type="video/mp4" />
            </video>
          </div>
          <div class="center-housing">
            <Typography
              gutterBottom
              variant="h4"
              style={{
                fontFamily: "Patua One",
                color: "white"
              }}
            >
              HOUSING
            </Typography>
          </div>
        </Link>
        <Link to={{ pathname: "/Restaurants" }}>
          <div
            style={{
              height: "100%",
              flex: "1",
              minHeight: "0",
              float: "left",
              width: "25%",
              opacity: "0.9"
            }}
          >
            <video
              ref="vidRef2"
              loop
              muted
              height="100%"
              onMouseOver={this.onHover2.bind(this)}
              onMouseLeave={this.onMouseOut2.bind(this)}
            >
              <source src={Rest} type="video/mp4" />
            </video>
          </div>
          <div class="center-rest">
            <Typography
              gutterBottom
              variant="h4"
              style={{
                fontFamily: "Patua One",
                color: "white"
              }}
            >
              RESTAURANTS
            </Typography>
          </div>
        </Link>
        <Link to={{ pathname: "/Places" }}>
          <div
            style={{
              height: "100%",
              flex: "1",
              minHeight: "0",
              float: "left",
              width: "25%",
              opacity: "0.9"
            }}
          >
            <video
              ref="vidRef3"
              loop
              muted
              height="100%"
              onMouseOver={this.onHover3.bind(this)}
              onMouseLeave={this.onMouseOut3.bind(this)}
            >
              <source src={Tourist} type="video/mp4" />
            </video>
          </div>
          <div class="center-places">
            <Typography
              gutterBottom
              variant="h4"
              style={{
                fontFamily: "Patua One",
                color: "white"
              }}
            >
              PLACES TO VISIT
            </Typography>
          </div>
        </Link>
        <Link to={{ pathname: "/Events" }}>
          <div
            style={{
              height: "100%",
              flex: "1",
              minHeight: "0",
              float: "left",
              width: "25%",
              opacity: "0.9"
            }}
          >
            <video
              ref="vidRef4"
              loop
              muted
              height="100%"
              onMouseOver={this.onHover4.bind(this)}
              onMouseLeave={this.onMouseOut4.bind(this)}
            >
              <source src={Events} type="video/mp4" />
            </video>
          </div>
          <div class="center-events">
            <Typography
              gutterBottom
              variant="h4"
              style={{
                fontFamily: "Patua One",
                color: "white"
              }}
            >
              EVENTS
            </Typography>
          </div>
        </Link>
      </div>
    );
  }
}
