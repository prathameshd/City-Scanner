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
import { Fade } from "react-slideshow-image";
import Map from "./Map";
import ls from "local-storage";
import { Form } from 'react-bootstrap';

const fadeProperties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    onChange: (oldIndex, newIndex) => {
      console.log(`fade transition from ${oldIndex} to ${newIndex}`);
    }
  };

class Details_Housing extends Component{
  constructor (props){
    super (props);
    this.state={
      place_details:[],
      allComments:[],
      comment:"",
      newPostAdded:false
    };
    this.getPlaceDetails = this.getPlaceDetails.bind(this);
    this.addComment = this.addComment.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fetchComments = this.fetchComments.bind(this);

<<<<<<< Updated upstream
=======
  }
  componentWillMount() {
  this.fetchComments();
}
componentDidMount() {
  console.log("I am here")
  console.log(this.state.newPostAdded)
  this.getPlaceDetails();
  
}
>>>>>>> Stashed changes

  }
  componentWillMount()
  {
    this.fetchComments();
  }
    componentDidMount(){
        console.log(this.state.newPostAdded)
        this.getPlaceDetails();
    }

<<<<<<< Updated upstream
    fetchComments()
    {
      var postData={
        "postsubjectname": ls.get("selectedIndex")["name"]
      }

      return axios({
        method: "post",
        url: "http://localhost:8080/gethouseposts",
        headers: { "Access-Control-Allow-Origin": "*" },
        data: postData
      })
        .then(response => {
          console.log("all comments"+JSON.stringify(response.data));
          //change state of all comments and re render

          this.setState({ allComments: response.data});
        })
        .catch(err => {
          console.log(err);
        });
    }

    onChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
=======
  return axios({
      method: "post",
      url: "http://localhost:8080/gethouseposts",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      data: postData
    })
    .then(response => {
      console.log("all comments" + JSON.stringify(response.data));
      //change state of all comments and re render

      this.setState({
        allComments: response.data
      });
    })
    .catch(err => {
      console.log(err);
    });
}

onChange(e) {
  this.setState({
    [e.target.name]: e.target.value
  });
}

getCoordinates() {
  return axios({
      method: "post",
      url: "http://localhost:8080/getPosition",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      data: ls.get("city")
    })
    .then(response => {
      console.log(response.data);
      this.setState({
        lat: response.data.lat
      });
      this.setState({
        long: response.data.long
      });
      console.log("states hanged", this.state);
    })
    .catch(err => {
      console.log(err);
    });
}

getShops() {
  return axios({
      method: "post",
      url: "http://localhost:8080/getShopping",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      data: ls.get("city")
    })
    .then(response => {
      console.log(response.data);
      this.setState({
        shops: response.data.results
      });
      this.setState({
        shopLoc: response.data.results
      });
    })
    .catch(err => {
      console.log(err);
    });
}

getBusStops() {
  return axios({
      method: "post",
      url: "http://localhost:8080/getBusStop",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      data: ls.get("city")
    })
    .then(response => {
      console.log(response.data);
      this.setState({
        busStop: response.data.results
      });
      this.setState({
        busStopLoc: response.data.results
      });
    })
    .catch(err => {
      console.log(err);
    });
}

getAtms() {
  return axios({
      method: "post",
      url: "http://localhost:8080/getAtm",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      data: ls.get("city")
    })
    .then(response => {
      console.log(response.data);
      this.setState({
        atm: response.data.results
      });
      this.setState({
        atmLoc: response.data.results
      });
    })
    .catch(err => {
      console.log(err);
    });
}

componentDidMount() {
  console.log("Place id is", ls.get("selectedIndex")["place_id"])
  this.getCoordinates();
  this.getShops();
  this.getBusStops();
  this.getAtms();
  this.getPlaceDetails();
  console.log("place details are", ls.get("place_details"))
}

getPlaceDetails() {
  return axios({
      method: "post",
      url: "http://localhost:8080/getPlaceDetails",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      data: ls.get("selectedIndex")["place_id"]
    })
    .then(response => {
      console.log("Response",response.data);
      this.setState({
        place_details: response.data.result
      });
      console.log("place det", this.state.place_details)
      //this.setState({ locations: response.data.results });
    })
    .catch(err => {
      console.log(err);
    });
}

addComment() {
  var data=this.refs.comment.value;
  console.log(data)
  var postData = {
    "username": ls.get('currentUser'),
    "title": "",
    "ratings": 0,
    "datetime": "",
    "category": "Housing",
    "postsubjectname": ls.get("selectedIndex")["name"],
    "postContent": data
  }
  console.log("-----------" + postData["postContent"], postData["username"], postData["postsubjectname"]);
>>>>>>> Stashed changes

    getPlaceDetails(){
      return axios({
        method: "post",
        url: "http://localhost:8080/getPlaceDetails",
        headers: { "Access-Control-Allow-Origin": "*" },
        data: ls.get("selectedIndex")["place_id"]
      })
        .then(response => {
          console.log(response.data);
          this.setState({ place_details: response.data.results });
          //this.setState({ locations: response.data.results });
        })
        .catch(err => {
          console.log(err);
        });
    }

    addComment(){
      var postData= {
        "username": ls.get('currentUser'),
        "title": "",
        "ratings":0 ,
        "datetime": "",
        "category": "Housing",
        "postsubjectname": ls.get("selectedIndex")["name"],
        "postContent": this.state.comment
    }
      console.log("-----------"+postData["postContent"],postData["username"],postData["postsubjectname"]);

      return axios({
        method: "post",
        url: "http://localhost:8080/savehousepost",
        headers: { "Access-Control-Allow-Origin": "*" },
        data: postData
      })
        .then(response => {
          console.log("successful post added"+response.data);
          //change state to re render component
          this.setState({
            newPostAdded: true
          })
          console.log("new added"+this.state.newPostAdded);
        })
        .catch(err => {
          console.log("error "+err);
        });

    }



    render(){
       let Comment=this.state.Comment

        return (
            <>
<<<<<<< Updated upstream
        <div className="container-fluid" style={{width:'90%'}}>
  <h1 className="my-4">{ls.get("selectedIndex")["name"]} </h1>
  <div className="row">
    <div className="col-md-8" style={{paddingRight:'50px'}}>
      <img className="img-fluid"                 src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/moscow.jpg" alt="" />
    </div>
    <div className="col-md-4">
      <h3 className="my-3">About</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae. Sed dui lorem, adipiscing in adipiscing et, interdum nec metus. Mauris ultricies, justo eu convallis placerat, felis enim.</p>
      <h3 className="my-3">Details</h3>
      <ul>
        <li>Address: {ls.get("selectedIndex")["vicinity"]}</li>
        <li>Average Rating:{ls.get("selectedIndex")["rating"]}</li>
      </ul>
    </div>
  </div>
</div>
=======
            <Modal style={{zIndex:50000,top:'40%'}} show={this.state.showModal1} onHide={this.changeState}>
            <div className="container" style={{padding:'5%'}}>
            <Form>
            <fieldset className="form-group">
                <h3>Edit Post:</h3>
                <input className="form-control" type="text" id="updatedComment" name="updatedComment" value={this.state.updatedComment} onChange={this.onChange}/>
            </fieldset>
            <button className="btn btn-error" style={{float:'right'}} type="button" onClick={this.deleteComment}>Delete</button>
            <button className="btn btn-success" style={{float:'right'}} type="button" onClick={this.updateComment}>Update</button>
            </Form>
            </div>
         </Modal>

            <div style={{ background: "gray url(https://subtlepatterns.com/patterns/geometry2.png)"}}>
            
            <div className="container-fluid" style={{width:'90%'}}>
            <h1 className="my-4">{ls.get("selectedIndex")["name"]} </h1>

          {/* <div>
          <center><h2>Places Details</h2></center>
          {this.state.place_details.map((el, i) => (
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">AAAa{el.website}</h5>
                {/*<h6 class="card-subtitle mb-2 text-muted">{contact.email}</h6>
                <p class="card-text">{contact.company.catchPhrase}</p>
              </div>
            </div>
          ))}
              </div>*/}
              

            
            <div className="row">
                <div className="col-md-8" style={{paddingRight:'50px'}}>
                <img className="img-fluid" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/moscow.jpg" alt="" />
                </div>
                <div className="col-md-4">
                    <div>
                    <h3 className="my-3" style={{'font-family': 'cursive'}}>About</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae. Sed dui lorem, adipiscing in adipiscing et, interdum nec metus. Mauris ultricies, justo eu convallis placerat, felis enim.</p>
                    <h3 className="my-3" style={{'font-family': 'cursive'}}>Details</h3>
                    <p>
                    <img style={{height:30, width:30}} src="https://icon-library.net/images/icon-for-address/icon-for-address-17.jpg"/> {ls.get("selectedIndex")["vicinity"]}<br/>
                        <br/><img style={{height:30, width:38}} src="https://www.trzcacak.rs/myfile/detail/212-2124037_phone-icon-2martina-tierney-ot2018-02-15t15-telephone.png"/> {this.state.place_details.formatted_phone_number}<br/>
                        <br/><img style={{height:30, width:38}} src="https://www.pngkit.com/png/detail/104-1049388_world-wide-web-logo-vector-transparent-background-website.png"/> {this.state.place_details.website}<br/> 
        
                        <pre><br/><img style={{height:30, width:30}} src="https://cdn3.iconfinder.com/data/icons/feedback-blue-set-1/100/Untitled-1-14-512.png"/>   {ls.get("selectedIndex")["rating"]}/5</pre>
                    </p>
                  </div>

                  <div className="container" style={{paddingTop:'4%'}}>
                            <Map
                              lat={this.state.lat}
                              long={this.state.long}
                              locations={this.state.locations}
                              shopLoc={this.state.shopLoc}
                              busStopLoc={this.state.busStopLoc}
                              atmLoc={this.state.atmLoc}
                              style={{height:'80% !important'}}
                            />
                  </div>
                </div>

            </div>
        </div>
        </div>

>>>>>>> Stashed changes

        <div className="container-fluid" style={{width:'90%',marginTop:'4%'}}>
        <div className="row">
        <div className="col-md-8">
        {this.state.allComments.map((el, i) => (
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
                <Card
                  className="cardsize"
                >
                  <CardActionArea>
                    <CardContent style={{ display: "inline-block" }}>
                      <Typography gutterBottom variant="h5" component="h3">
                        {el.postContent}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h1">
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {el.username}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
            </div>
          ))}
        </div>

        <div className="col-md-4">
        <Form>
        <fieldset className="form-group">
            <h3>Write a Post:</h3>
            <input className="form-control" type="text" id="comment" name="comment" value={this.state.comment} onChange={this.onChange}/>
        </fieldset>

        <button className="btn btn-success" type="button" onClick={this.addComment}>Post</button>
        </Form>
              </div>

        </div>
        </div>
            </>
        );
    }
}
export default Details_Housing;
