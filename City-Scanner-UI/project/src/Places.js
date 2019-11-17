import React, { Component } from "react";
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import Map from "./Map";

class Places extends Component {
   constructor(props) {
    super(props);
    this.state={
      places: [],
      locations:[],
      lat:" ",
      long:" "
    };
  }

  componentDidMount()
  {
    //Retrieve places from API
       return axios
    ({
      method:'post',
      url:'http://localhost:8080/getPlaces',
      headers: {'Access-Control-Allow-Origin': '*'},
      data:this.props.location

    })
    .then((response)=>{
            console.log(response.data)
           this.setState({places: response.data.results})
           this.setState({locations: response.data.results})

          //Get lat, long to set map position
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

        <h1>Places in {data}</h1>
         <div className="row">
          <div className="col-sm-6  ">
          {
            this.state.places.map((el,i) => (
            <div style={{display: 'inline-block',width:350, marginBottom: 18, marginRight: 18, marginLeft:100, paddingTop: '10px', fontColor: 'black'}}>
             <Card className="cardsize">
                   <CardActionArea>
                     <CardContent style={{display: 'inline-block'}}>
                       <Typography gutterBottom variant="h5" component="h3">
                         {el.name}
                       </Typography>
                       <Typography gutterBottom variant="h5" component="h1">
                       <Rater total={5} rating={el.rating} />
                       </Typography>
                       <Typography variant="body2" color="textSecondary" component="p">
                         {el.vicinity}
                       </Typography>
                       <Typography variant="body2" color="textSecondary" component="p">
                         {el.types[0]}
                         &nbsp;
                         {el.types[1]}
                         &nbsp;
                         {el.types[2]}
                         &nbsp;
                         {el.types[3]}
                       </Typography>
                     </CardContent>
                   </CardActionArea>
                 </Card>
             </div>))
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
      </>
    );
  }
}
}

export default Places;
