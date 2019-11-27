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


  }
  componentWillMount()
  {
    this.fetchComments();
  }
    componentDidMount(){
        console.log(this.state.newPostAdded)
        this.getPlaceDetails();
    }

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
