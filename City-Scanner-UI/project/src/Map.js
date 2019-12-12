//IzaSyDwz_0zYQuRxD00R6pc-Wuu2nctNnwF5xw

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import ls from "local-storage";

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfoWindow: false
    };
  }
  handleMouseOver = e => {
    this.setState({
      showInfoWindow: true
    });
  };

  handleMouseExit = e => {
    this.setState({
      showInfoWindow: false
    });
  };

  housingMarkers = () => {
    console.log("location of page" + ls.get("page"));
    if (ls.get("page") == "housing") {
      return this.props.locations.map((store, index) => {
        return (
          <Marker
            key={index}
            id={index}
            icon={{
              url: require("./house.png"),
              scaledSize: { width: 26, height: 26 }
            }}
            position={{
              lat: store.geometry.location.lat,
              lng: store.geometry.location.lng
            }}
            onClick={() => console.log("You clicked me!")}
          />
        );
      });
    } else {
      return this.props.locations.map((store, index) => {
        return (
          <Marker
            key={index}
            id={index}
            position={{
              lat: store.geometry.location.lat,
              lng: store.geometry.location.lng
            }}
            onClick={() => console.log("You clicked me!")}
          />
        );
      });
    }
  };

  shopMarkers = () => {
    return this.props.shopLoc.map((store, index) => {
      return (
        <Marker
          key={index}
          id={index}
          icon={{
            url: require("./shop1.svg"),
            scaledSize: { width: 20, height: 20 }
          }}
          position={{
            lat: store.geometry.location.lat,
            lng: store.geometry.location.lng
          }}
          onClick={() => console.log("You clicked me!")}
        />
      );
    });
  };

  busStopMarkers = () => {
    return this.props.busStopLoc.map((store, index) => {
      return (
        <Marker
          key={index}
          id={index}
          icon={{
            url: require("./busStop.png"),
            scaledSize: { width: 20, height: 20 }
          }}
          position={{
            lat: store.geometry.location.lat,
            lng: store.geometry.location.lng
          }}
          onClick={() => console.log("You clicked me!")}
        />
      );
    });
  };

  atmMarkers = () => {
    return this.props.atmLoc.map((store, index) => {
      return (
        <Marker
          key={index}
          id={index}
          icon={{
            url: require("./atm.png"),
            scaledSize: { width: 22, height: 22 }
          }}
          position={{
            lat: store.geometry.location.lat,
            lng: store.geometry.location.lng
          }}
          onClick={() => console.log("You clicked me!")}
        />
      );
    });
  };

  render() {
    const mapStyles = {
      width: "95%",
      height: "40%"
    };

    return (
      <Map
        google={this.props.google}
        zoom={13}
        style={mapStyles}
        initialCenter={{ lat: this.props.lat, lng: this.props.long }}
      >
        <Marker position={{ lat: this.props.lat, lng: this.props.long }} />
        {this.housingMarkers()}
        {this.shopMarkers()}
        {this.busStopMarkers()}
        {this.atmMarkers()}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyC4wnWcJ3723NyyusSiFb55uT6T-YSVQsI"
})(MapContainer);
