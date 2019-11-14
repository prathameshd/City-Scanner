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
      method:'post',
      url:'http://localhost:8080/getRestaurants',
      headers: {'Access-Control-Allow-Origin': '*'},
      data:this.props.location

    })
    .then((response)=>{
      console.log(response)
    }).catch(err =>
      {
        console.log(err);
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
