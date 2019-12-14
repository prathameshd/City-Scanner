import React, { Component } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Map from "./Map";
import ls from "local-storage";
import localStorage from "localStorage";
import { ToastsContainer, ToastsStore } from "react-toasts";
import  "./App"

class Housing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      establishments: [],
      shops: [],
      locations: [],
      shopLoc: [],
      busStop: [],
      busStopLoc: [],
      atm: [],
      atmLoc: [],
      lat: " ",
      long: " "
    };
    this.getCoordinates = this.getCoordinates.bind(this);
    this.getHousing = this.getHousing.bind(this);
    this.getShops = this.getShops.bind(this);
    this.getBusStops = this.getBusStops.bind(this);
    this.getAtms = this.getAtms.bind(this);
  }

  componentWillMount() {
    ls.set("page", "housing");
  }

  // handleClick = event => {
  //   const {
  //     target: { value }
  //   } = event;

  //   // And do whatever you need with it's value, for example change state
  //   this.setState({ someProperty: value });
  //   alert(value);
  // };

  handleClick(index) {
    this.setState({ index });
    ls.set("selectedIndex", index);
          window.location.href="/HousingDetails"
  }

  getCoordinates() {
    return axios({
      method: "post",
      url: "http://localhost:8080/getPosition",
      headers: { "Access-Control-Allow-Origin": "*" },
      data: ls.get("city")
    })
      .then(response => {
        console.log(response.data);
        this.setState({ lat: response.data.lat });
        this.setState({ long: response.data.long });
        console.log("states hanged", this.state);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getHousing() {
    return axios({
      method: "post",
      url: "http://localhost:8080/getHousing",
      headers: { "Access-Control-Allow-Origin": "*" },
      data: ls.get("city")
    })
      .then(response => {
        console.log(response.data);
        this.setState({ establishments: response.data.results });
        this.setState({ locations: response.data.results });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getShops() {
    return axios({
      method: "post",
      url: "http://localhost:8080/getShopping",
      headers: { "Access-Control-Allow-Origin": "*" },
      data: ls.get("city")
    })
      .then(response => {
        console.log(response.data);
        this.setState({ shops: response.data.results });
        this.setState({ shopLoc: response.data.results });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getBusStops() {
    return axios({
      method: "post",
      url: "http://localhost:8080/getBusStop",
      headers: { "Access-Control-Allow-Origin": "*" },
      data: ls.get("city")
    })
      .then(response => {
        console.log(response.data);
        this.setState({ busStop: response.data.results });
        this.setState({ busStopLoc: response.data.results });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getAtms() {
    return axios({
      method: "post",
      url: "http://localhost:8080/getAtm",
      headers: { "Access-Control-Allow-Origin": "*" },
      data: ls.get("city")
    })
      .then(response => {
        console.log(response.data);
        this.setState({ atm: response.data.results });
        this.setState({ atmLoc: response.data.results });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getHousing();
    this.getCoordinates();
    this.getShops();
    this.getBusStops();
    this.getAtms();
  }

  render() {
    if (ls.get("city") == null) {
      window.location.href = "/home";
    } else if (this.state.lat != " " && this.state.long != " ") {
      return (
        <div className="my-4" style={{paddingTop: "0px", overflowY: "hidden"}}>
        <center><font size="6">Explore housing options near {ls.get("city")}</font></center><br/>
        <div style={{backgroundColor: "#eceff1",paddingTop:'1%' }}>
        <div
          className="containter-fluid"
          style={{
            overflowX: "hidden",
            overflowY: "hidden",
            //background: "gray url(https://www.publicdomainpictures.net/pictures/230000/nahled/light-blue-background.jpg)"
            //backgroundColor: "#eceff1",
            width: "90%",
            marginLeft: "5%"
          }}
        >
          
          <div className="row">
         
            <div
              className="col-sm-6" id="style-1"
                style={{
                 overflowY: "scroll",
                 overflowX: "hidden",
                 height: "600px",
                 
                 
                 //backgroundColor: "#ede0dc"
                //  '&::-webkit-scrollbar': {
                //    width: '90px'
                //   ;padding:5px;margin-top:5px;padding:5px;font: 24px/36px sans-serif;width:200px;height:150px;overflow:scroll;"
                //  },
                //  '&::-webkit-scrollbar-track': {
                //    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
                //    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                //  },
                //  '&::-webkit-scrollbar-thumb': {
                //    backgroundColor: 'rgba(0,0,0,.3)',
                //    outline: '1px solid blue'
                // }
              }}
            >
              
              {this.state.establishments.map((el, i) => (
                <div
                  style={{
                    display: "inline-block",
                    marginBottom: 18,
                    marginRight: 18,
                    marginLeft: 38,
                    paddingTop: "0px",
                    fontColor: "black"
                  }}
                >
                  <Card onClick={this.handleClick.bind(this, el)}>
                    <CardActionArea>
                      <div>
                        <div
                          className="card float-right"
                          style={{ width: 600, height: 170 }}
                        >
                          <div className="row">
                            <div className="col-sm-4">
                              <img
                                className="d-block w-100"
                                src="http://www.clipartbest.com/cliparts/aTe/ony/aTeonyRyc.jpg"
                                alt=""
                              />
                            </div>
                            <div className="col-sm-8" style={{ marginTop: 10 }}>
                              <div className="card-block">
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="h3"
                                >
                                  {el.name}
                                </Typography>
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="h1"
                                >
                                  <Rater total={5} rating={el.rating} />
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  component="p"
                                >
                                  {el.vicinity}
                                </Typography>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                    </CardActionArea>
                    
                    {/* <CardActionArea>
                        <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          height="140"
                          width="80"
                          image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/singapore.jpg"
                          title="Contemplative Reptile"
                        />
                        <CardContent style={{ display: "inline-block" }}>
                          <Typography gutterBottom variant="h5" component="h3">
                            {el.name}
                          </Typography>
                          <Typography gutterBottom variant="h5" component="h1">
                            <Rater total={5} rating={el.rating} />
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {el.vicinity}
                          </Typography>
                          <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {el.types[0]}
                          &nbsp;
                          {el.types[1]}
                          &nbsp;
                          {el.types[2]}
                          &nbsp;
                          {el.types[3]}
                          </Typography>
                        </CardContent>
                      </CardActionArea> */}
                  </Card>
                </div>
                
              ))}
            </div>
            <div className="col-sm-6"               style={{ height: 1325, overflowX: "hidden", overflowY: "hidden",paddingLeft:'4%'}}>

              <Map
                lat={this.state.lat}
                long={this.state.long}
                locations={this.state.locations}
                shopLoc={this.state.shopLoc}
                busStopLoc={this.state.busStopLoc}
                atmLoc={this.state.atmLoc}
              />
            </div>
          </div>
        </div>
        </div>
        </div>
      );
    } else {
      return <></>;
    }
  }
}

export default Housing;

