//IzaSyDwz_0zYQuRxD00R6pc-Wuu2nctNnwF5xw

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
 import ls from 'local-storage'

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

  displayMarkers = () => {
    console.log("location of page"+ls.get('page'))
    if(ls.get('page')=='housing')
    {
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
  }
  else
  {
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

  displayMarkers2 = () => {
    return this.props.shopLoc.map((store, index) => {
      return (
        <Marker
          key={index}
          id={index}
          icon={{
            url: require("./shop.svg"),
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

  render() {
    const mapStyles = {
      width: "80%",
      height: "20%"
    };

    return (
      <Map
        google={this.props.google}
        zoom={12}
        style={mapStyles}
        initialCenter={{ lat: this.props.lat, lng: this.props.long }}
      >
        <Marker position={{ lat: 48.0, lng: -122.0 }} />
        {this.displayMarkers()}
        {this.displayMarkers2()}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAJA71Rtblkd6TpFQvsgsnCbOVUqDCf-nc"
})(MapContainer);
