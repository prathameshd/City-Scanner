import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Map from "./Map";

class Restaurants extends Component {

   constructor(props) {
    super(props);
    this.state={
      restaurants: [],
      locations:[],
      lat:" ",
      long:" "
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
           this.setState({locations: response.data.results})


     return axios
          ({
            method:'post',
            url:'http://localhost:8080/getPosition',
            headers: {'Access-Control-Allow-Origin': '*'},
            data:this.props.location
          })
          .then((response)=>{
                  console.log(response.data)
                 this.setState({lat: response.data.lat})
                 this.setState({long: response.data.long})
                console.log("states hanged",this.state)

          }).catch(err =>
            {
              console.log(err);
            })


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
    else if(this.state.lat!=" " && this.state.long!=" ")
    {

return (
      <div className="containter-fluid">

        <h1>Restaurants in {data}</h1>
         <div className="row">
          <div className="col-sm-6  ">
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
          <div className="col-sm-6">
                    <Map lat={this.state.lat} long={this.state.long} locations={this.state.locations}/>

          </div>

          </div>
      </div>
    );

              
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