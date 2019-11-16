//IzaSyDwz_0zYQuRxD00R6pc-Wuu2nctNnwF5xw

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Map, GoogleApiWrapper,Marker } from 'google-maps-react';

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
    return this.props.locations.map((store, index) => {
      return <Marker key={index} id={index} position={{
       lat: store.geometry.location.lat,
       lng: store.geometry.location.lng
     }} 
     onClick={() => console.log("You clicked me!")} />
    })
  }

  render() {
const mapStyles = {
  width: '80%',
  height: '20%',
};
    return (
        

          <Map
          google={this.props.google}
          zoom={12}
          style={mapStyles}
          initialCenter={{ lat: this.props.lat, lng: this.props.long}}
        >
                  <Marker position={{ lat: 48.00, lng: -122.00}} />
                  {this.displayMarkers()}
        </Map>
      
    );
}
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBs7TUDLsbi_b4rm76Ng4KeJLJ9uhMFhn4'
})(MapContainer);