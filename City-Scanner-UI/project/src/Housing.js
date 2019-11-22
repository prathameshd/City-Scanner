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
 import ls from 'local-storage'

class Housing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      establishments: [],
      shops: [],
      locations: [],
      shopLoc: [],
      lat: " ",
      long: " "
    };
    this.getCoordinates = this.getCoordinates.bind(this);
    this.getHousing = this.getHousing.bind(this);
    this.getShops = this.getShops.bind(this);
  }
  handleClick = event => {
    const {
      target: { value }
    } = event;

    // And do whatever you need with it's value, for example change state
    this.setState({ someProperty: value });
    alert(value);
  };

  getCoordinates() {
    return axios({
      method: "post",
      url: "http://localhost:8080/getPosition",
      headers: { "Access-Control-Allow-Origin": "*" },
      data:ls.get('city')
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
      data:ls.get('city')
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
      data:ls.get('city')
    })
      .then(response => {
        console.log(response.data);
        this.setState({ shops: response.data.results });
        this.setState({ shopLoc: response.data.results });
        console.log("ansn" + this.state.shopLoc);
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getHousing();
    this.getCoordinates();
    this.getShops();
  }

  render() {
    if (ls.get('city') == null) {
      window.location.href = "/home";
    } else if (this.state.lat != " " && this.state.long != " ") {
      return (
        <div className="containter-fluid">
          <h1>Establishments in {ls.get('city')}</h1>
          <div className="row">
            <div className="col-sm-6  ">
              {this.state.establishments.map((el, i) => (
                <div
                  style={{
                    display: "inline-block",
                    marginBottom: 18,
                    marginRight: 18,
                    marginLeft: 100,
                    paddingTop: "10px",
                    fontColor: "black"
                  }}
                >
                  <Link to={{ pathname: "/Housing-details"}}>
                    <Card className="cardsize" >
                      <CardActionArea>
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
                          {/* <Typography
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
                        </Typography> */}
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
            <div className="col-sm-6">
              <Map
                lat={this.state.lat}
                long={this.state.long}
                locations={this.state.locations}
                shopLoc={this.state.shopLoc}
              />
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
