//IzaSyDwz_0zYQuRxD00R6pc-Wuu2nctNnwF5xw

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Map, GoogleApiWrapper } from 'google-maps-react';

class MapContainer extends Component {

   constructor(props) {
    super(props);
  }

  render() {
const mapStyles = {
  width: '100%',
  height: '35%',
};
    return (
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: this.props.lat, lng: this.props.long}}
        />
    );
}
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBs7TUDLsbi_b4rm76Ng4KeJLJ9uhMFhn4'
})(MapContainer);
