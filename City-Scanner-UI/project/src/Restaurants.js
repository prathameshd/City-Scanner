import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

class Restaurants extends Component {

   constructor(props) {
    super(props);
  }

  componentDidMount()
  {
       return axios
    ({
      method:'get',
      url:'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=18,73&radius=1500000&type=restaurant&keyword=chinese&key=AIzaSyDwz_0zYQuRxD00R6pc-Wuu2nctNnwF5xw',
      headers: {'Access-Control-Allow-Origin': '*'}

    })
    .then((response)=>{
      console.log(response)
    }).catch(err =>
      {

      })
  }

  render() {
    const { data } = this.props.location;
    if(data==null)
    {
      window.location.href="/home";
    }
    else
    {
    return (
      <>
        <h1>Restaurants in {data}</h1>
      </>
    );
  }
}
}

export default Restaurants;
