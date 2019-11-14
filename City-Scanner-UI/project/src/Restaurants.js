import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

class Restaurants extends Component {

   constructor(props) {
    super(props);
    this.state={
      restaurants: []
    };
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
            console.log(response.data)
           this.setState({restaurants: response.data.results})

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
          <div>
                         {
                  this.state.restaurants.map((el,i) => (
                    <Card key={i} style={{marginBottom: 18, width: 650, height: 150, marginRight: 18, display: 'inline-block', paddingTop: '10px', fontColor: 'black'}}>
        
                    <div>{el.price_level}</div> 
                    <div name="songDetailsRec" style={{height:'inherit'}}>
                    <div name="titleSongRec"
                    style= {{textAlign: "center", verticalAlign: "middle", lineHeight: "140px", height:'inherit', fontWeight: "bold", fontSize: 25}}>
                    {el.name}
                    {el.rating}
                    </div>

                    </div>
                
                 
                    </Card>))
                  }
          </div>

      </>
    );
  }
}
}

export default Restaurants;
