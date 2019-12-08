import React, { PureComponent } from "react";
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
import Modal from 'react-bootstrap/Modal';
import {ToastsContainer, ToastsStore} from 'react-toasts';


const fadeProperties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    onChange: (oldIndex, newIndex) => {
      console.log(`fade transition from ${oldIndex} to ${newIndex}`);
    }
  };

class Details_Places extends PureComponent{
  constructor (props){
    super (props);
    this.state={
      place_details:[],
      allComments:[],
      comment:"",
      newPostAdded:false,
      establishments: [],
        locations: [],
        lat: " ",
        long: " ",
        showModal1: false,
        updatedComment:"",
        updatedPostId:"",
        isliked:false,
        upvotes:0,
        downvotes:0,
    };

    this.getCoordinates = this.getCoordinates.bind(this);
    this.getPlaceDetails = this.getPlaceDetails.bind(this);
    this.addComment = this.addComment.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fetchComments = this.fetchComments.bind(this);
    this.changeState = this.changeState.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);

  }
  componentWillMount() {
  this.fetchComments();
}
componentDidMount() {
  this.getPlaceDetails();
}

fetchComments() {
  var postData = {
    "postsubjectname": ls.get("selectedIndex")["name"]
  }

  return axios({
      method: "post",
      url: "http://localhost:8080/getPlacePosts",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      data: postData
    })
    .then(response => {
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
      this.setState({
        lat: response.data.lat
      });
      this.setState({
        long: response.data.long
      });
    })
    .catch(err => {
      console.log(err);
    });
}



componentDidMount() {
  this.getCoordinates();
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
      this.setState({
        place_details: response.data.results
      });
      //this.setState({ locations: response.data.results });
    })
    .catch(err => {
      console.log(err);
    });
}

addComment() {
  var data=this.refs.comment.value;
  var postData = {
    "username": ls.get('currentUser'),
    "title": "",
    "ratings": 0,
    "datetime": "",
    "category": "Places",
    "postsubjectname": ls.get("selectedIndex")["name"],
    "postContent": data,
    "upvotes":0,
    "downvotes":0
  }

  return axios({
      method: "post",
      url: "http://localhost:8080/savePlacesPost",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      data: postData
    })
    .then(response => {
      //change state to re render component
      this.setState({
        newPostAdded: true
      })
      this.refs.comment.value="";
      this.fetchComments();
      this.sendNotifications();
      ToastsStore.success("New Post Added");

    })
    .catch(err => {
      console.log("error " + err);
    });

}

handleClick(index) {
  console.log(index)
  if (ls.get("currentUser") == index["username"])
    this.setState({
      showModal1: true,
      updatedComment: index["postContent"],
      updatedPostId: index["postId"],
      upvotes:index["upvotes"],
      downvotes:index["downvotes"]
    })
  }

changeState() {
  this.setState({
    showModal1: !this.state.showModal1
  })
}

updateComment(index) {
  //axios call to update this comment
  var postData = {
    "username": ls.get("currentUser"),
    "title": "",
    "ratings": 0,
    "datetime": "",
    "category": "Places",
    "postsubjectname": index["postsubjectname"],
    "postContent": this.state.updatedComment,
    "postId": this.state.updatedPostId,
    "upvotes":this.state.upvotes,
    "downvotes":this.state.downvotes,
  }
  return axios({
      method: "post",
      url: "http://localhost:8080/updatePlacesPost",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      data: postData
    })
    .then(response => {

      this.changeState();
      this.fetchComments();
      ToastsStore.success("Post Updated");
    })
    .catch(err => {
      console.log("error while updating" + err);
    });
}

deleteComment(index) {
  var postData = {
    "username": ls.get("currentUser"),
    "title": "",
    "ratings": 0,
    "datetime": "",
    "category": "Places",
    "postsubjectname": index["postsubjectname"],
    "postContent": this.state.updatedComment,
    "postId": this.state.updatedPostId,
    "upvotes":this.state.upvotes,
    "downvotes":this.state.downvotes
  }
  return axios({
      method: "post",
      url: "http://localhost:8080/deletePlacesPost",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      data: postData
    })
    .then(response => {
      this.changeState();
      this.fetchComments();
      ToastsStore.success("Post Deleted");

      //change state to re render component
    })
    .catch(err => {
      console.log("error while deleting" + err);
    });
}


upvote(index) {
  var count = index['upvotes'] + 1;
  var postData = {
    "username": ls.get("currentUser"),
    "title": "",
    "ratings": 0,
    "datetime": "",
    "category": "Places",
    "postsubjectname": index["postsubjectname"],
    "postContent": index['postContent'],
    "postId": index['postId'],
    "upvotes":count,
    "downvotes":index['downvotes']
  }
  return axios({
      method: "post",
      url: "http://localhost:8080/updatePlacesPost",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      data: postData
    })
    .then(response => {
      console.log("update success" + response.data);
      this.fetchComments();
    })
    .catch(err => {
      console.log("error while updating" + err);
    });
}

downvote(index) {

  var count = index['downvotes'] + 1;

  this.setState({
    updatedPostId: index["postId"]
  })

  var postData = {
    "username": ls.get("currentUser"),
    "title": "",
    "ratings": 0,
    "datetime": "",
    "category": "Places",
    "postsubjectname": index["postsubjectname"],
    "postContent":  index['postContent'],
    "postId":  index['postId'],
    "downvotes":count,
    "upvotes":index['upvotes']
  }
  return axios({
      method: "post",
      url: "http://localhost:8080/updatePlacesPost",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      data: postData
    })
    .then(response => {
      console.log("update success" + response.data);
      this.fetchComments();
    })
    .catch(err => {
      console.log("error while updating" + err);
    });
}

sendNotifications()
{
  var postData = {
    "email": '',
    "cityName": localStorage.getItem("city"),
    "notificationType":"Places",
  }

  return axios({
      method: "post",
      url: "http://localhost:8080/getSubscribedUsers",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      data: postData
    })
    .then(response => {

    })
    .catch(err => {
      console.log("error while sending Notifications" + err);
    });
}
    render(){
       let Comment=this.state.Comment
        return (
            <>
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
            <div className="row">
                <div className="col-md-8" style={{paddingRight:'50px'}}>
                <img className="img-fluid" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/moscow.jpg" alt="" />
                </div>
                <div className="col-md-4">
                    <div>
                    <h3 className="my-3" style={{'font-family': 'cursive'}}>About</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae. Sed dui lorem, adipiscing in adipiscing et, interdum nec metus. Mauris ultricies, justo eu convallis placerat, felis enim.</p>
                    <h3 className="my-3" style={{'font-family': 'cursive'}}>Details</h3>
                    <ul>
                        <li>Address: {ls.get("selectedIndex")["vicinity"]}</li>
                        <li>Average Rating:{ls.get("selectedIndex")["rating"]}</li>
                    </ul>
                  </div>

                  <div className="container" style={{paddingTop:'4%'}}>
                            <Map
                              lat={ls.get("selectedIndex")["geometry"]["location"]["lat"]}
                              long={ls.get("selectedIndex")["geometry"]["location"]["lng"]}
                              locations={this.state.locations}
                              shopLoc={[]}
                              busStopLoc={[]}
                              atmLoc={[]}
                              style={{height:'80% !important'}}
                            />
                  </div>
                </div>

            </div>
        </div>
        </div>


        <div className="container-fluid" style={{width:'90%',marginTop:'4%'}}>
        {ls.get("currentUser") !=""?

        <div className="row">
        <div className="col-md-8">
        {this.state.allComments.map((el, i) => (
                <div className="container" style={{paddingBottom:10}}>
                    <div className="card">
                    <div className="card-body">
                        <div className="row">
                        <div className="col-md-2">
                            <img src="https://image.ibb.co/jw55Ex/def_face.jpg" className="img img-rounded img-fluid" />
                            <p className="text-secondary text-center">15 Minutes Ago</p>
                        </div>
                        <div className="col-md-10">
                            <p>
        <a className="float-left" href="https://maniruzzaman-akash.blogspot.com/p/contact.html"><strong>{el.username}</strong></a>
                            <span className="float-right"><i className="text-warning fa fa-star" /></span>
                            <span className="float-right"><i className="text-warning fa fa-star" /></span>
                            <span className="float-right"><i className="text-warning fa fa-star" /></span>
                            <span className="float-right"><i className="text-warning fa fa-star" /></span>
                            </p>
                            <div className="clearfix" />
                            <p>{el.postContent}</p>
                              <div className="like grow" style={{float:'left', bottom:'0px'}}>
                                <i className="fa fa-thumbs-up fa-2x like" aria-hidden="true" onClick={this.upvote.bind(this, el)}/>
                              {el.upvotes}
                              </div>
                              <div className="dislike grow" style={{float:'left', bottom:'0px'}}>
                                <i className="fa fa-thumbs-down fa-2x like" aria-hidden="true" onClick={this.downvote.bind(this, el)}/>
                            {el.downvotes}
                            </div>
                            <div>
                         {ls.get("currentUser")==el.username
                           ? <button className="float-right btn btn-error" onClick={this.handleClick.bind(this, el)}>Edit</button>
                           : null
                         }
                       </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
          ))}
        </div>



        <div className="col-md-4">
        <Form>
        <fieldset className="form-group">
            <h3>Write a Post:</h3>
            <input className="form-control" type="text" ref="comment" id="comment" name="comment"/>
        </fieldset>

        <button className="btn btn-success" type="button" onClick={this.addComment}>Post</button>
        </Form>
              </div>

        </div>:
        <div className="row">
        <h3>Login to see all posts</h3>
        </div>
      }
        </div>
        <ToastsContainer store={ToastsStore}/>

            </>
        );
    }
}
export default Details_Places;
