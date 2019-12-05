import React, { Component } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import ls from "local-storage";

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      locations: [],
      lat: " ",
      long: " "
    };
    this.getCoordinates = this.getCoordinates.bind(this);
    this.getEvents = this.getEvents.bind(this);
  }

  componentWillMount() {
    ls.set("page", "event");
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

  getEvents() {
    return axios({
      method: "post",
      url: "http://localhost:8080/getEvent",
      headers: { "Access-Control-Allow-Origin": "*" },
      data: ls.get("city")
    })
      .then(response => {
        console.log(response.data);
        this.setState({ events: response.data._embedded.events });
        this.setState({ locations: response.data.results });
      })
      .catch(err => {
        console.log(err);
      });
  }
  componentDidMount() {
    this.getCoordinates();
    this.getEvents();
  }

  render() {
    if (ls.get("city") == null) {
      window.location.href = "/home";
    } else if (this.state.lat != " " && this.state.long != " ") {
      return (
        <div className="containter-fluid">
          <h1>Events in {ls.get("city")}</h1>
          <div className="row">
            {this.state.events.map((el, i) => (
              <div
                style={{
                  display: "inline-block",
                  marginBottom: 5,
                  marginRight: 12,
                  marginLeft: 100,
                  paddingTop: "10px",
                  fontColor: "black"
                }}
              >
                <Card>
                  <CardActionArea>
                    <div>
                      <div className="card float-right" style={{ width: 400 }}>
                        <div className="row">
                          <div className="col-sm-5">
                            <img
                              className="d-block w-100"
                              src="https://picsum.photos/150?image=641"
                              alt=""
                            />
                          </div>
                          <div className="col-sm-7" style={{ marginTop: 10 }}>
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
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  }
}

export default Events;
