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
import Modal from 'react-bootstrap/Modal';
import {ToastsContainer, ToastsStore} from 'react-toasts';

class EventDetails extends Component{
  constructor (props){
    super (props);
    this.state={
            allComments:[],
            upvotes:0,
            downvotes:0,
        showModal1: false,
        updatedComment:"",
        updatedPostId:"",
        lat:'',
        long:''

    };
    this.fetchComments = this.fetchComments.bind(this);
    this.addComment = this.addComment.bind(this);
        this.changeState = this.changeState.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getCoordinates = this.getCoordinates.bind(this);

   // this.sendNotifications = this.sendNotifications.bind(this);


  }

onChange(e) {
  this.setState({
    [e.target.name]: e.target.value
  });
}

componentWillMount()
{
        this.getCoordinates()
}
  componentDidMount()
  {
    this.fetchComments()
  }

//Method to get all comments for this event
  fetchComments() {
  var postData = {
    "postsubjectname": ls.get("selectedIndex")["eventTitle"]
  }

    if(postData["postsubjectname"]==null)
  {
   postData["postsubjectname"]=ls.get("selectedIndex")["name"] 
  }

  return axios({
      method: "post",
      url: "http://localhost:8080/getEventPosts",
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
      console.log("all the commeentssss"+JSON.stringify(response.data))
    })
    .catch(err => {
      console.log(err);
    });
}

//Method to add new Comment under current event
addComment() {
  var data=this.refs.comment.value;

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;

  var postData = {
    "username": ls.get('currentUser'),
    "title": "",
    "ratings": 0,
    "datetime": today,
    "category": "Events",
    "postsubjectname": ls.get("selectedIndex")["eventTitle"],
    "postcontent": data,
    "upvotes":0,
    "downvotes":0
  }
  if(postData["postsubjectname"]==null)
  {
   postData["postsubjectname"]=ls.get("selectedIndex")["name"] 
  }

  return axios({
      method: "post",
      url: "http://localhost:8080/saveEventPost",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      data: postData
    })
    .then(response => {
      //change state to re render component

      this.refs.comment.value="";
      this.fetchComments();
     this.sendNotifications();
      ToastsStore.success("New Post Added");

    })
    .catch(err => {
      console.log("error " + err);
    });

}

//Method to send notifications when a new post is added
sendNotifications()
{
  var postData = {
    "email": '',
    "cityName": localStorage.getItem("city"),
    "notificationType":"Events",
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


upvote(index) {
  var count = index['upvotes'] + 1;
  var postData = {
    "username": ls.get("currentUser"),
    "title": "",
    "ratings": 0,
    "datetime": "",
    "category": "Events",
    "postsubjectname": index["postsubjectname"],
    "postcontent": index['postcontent'],
    "postid": index['postid'],
    "upvotes":count,
    "downvotes":index['downvotes']
  }
  return axios({
      method: "post",
      url: "http://localhost:8080/updateEventPost",
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
    updatedPostId: index["postid"]
  })

  var postData = {
    "username": ls.get("currentUser"),
    "title": "",
    "ratings": 0,
    "datetime": "",
    "category": "Events",
    "postsubjectname": index["postsubjectname"],
    "postcontent":  index['postcontent'],
    "postid":  index['postid'],
    "downvotes":count,
    "upvotes":index['upvotes']
  }
  return axios({
      method: "post",
      url: "http://localhost:8080/updateEventPost",
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

handleClick(index) {
  if (ls.get("currentUser") == index["username"])
    this.setState({
      showModal1: true,
      updatedComment: index["postcontent"],
      updatedPostId: index["postid"],
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
    "category": "Events",
    "postsubjectname": index["postsubjectname"],
    "postcontent": this.state.updatedComment,
    "postid": this.state.updatedPostId,
    "upvotes":this.state.upvotes,
    "downvotes":this.state.downvotes,
  }

  return axios({
      method: "post",
      url: "http://localhost:8080/updateEventPost",
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
    "category": "Restaurant",
    "postsubjectname": index["postsubjectname"],
    "postcontent": this.state.updatedComment,
    "postid": this.state.updatedPostId,
    "upvotes":this.state.upvotes,
    "downvotes":this.state.downvotes
  }
  return axios({
      method: "post",
      url: "http://localhost:8080/deleteEventPost",
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

getCoordinates() {
  return axios({
      method: "post",
      url: "http://localhost:8080/getPosition",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      data: ls.get("selectedIndex")["eventAddress"]
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

  render()
  {
    let imagePath=""
    ls.get("userCreatedEvent")==false?
    imagePath=ls.get("selectedIndex")["images"][0]["url"]:
    imagePath="./EventImages/"+ls.get("selectedIndex")["eventImage"]
   
    return(
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
         <div className="my-4">
         <center><font size="6">{ls.get("selectedIndex")["name"]} {ls.get("selectedIndex")["eventTitle"]}</font> </center></div>
            <div style={{ background: "gray url(https://subtlepatterns.com/patterns/geometry2.png)",paddingBottom:'2%',paddingTop:'2%'}}>
            <div className="container" style={{width:'90%'}}>
            <div className="row" style={{height:'450px'}}>
                <div className="col-md-8" style={{paddingRight:'50px', paddingTop:'2%'}}>
                <img style={{height:"400px",width:'600px'}} className="img-fluid" src={imagePath} alt="" />
                </div>
                <div className="col-md-4">
                    <div>
                    <h3 className="my-3" style={{'font-family': 'cursive'}}>Details</h3>
                    <ul>
                    { ls.get("userCreatedEvent")==false?
                    <>
                    <li>Address:{ls.get("selectedIndex")["_embedded"]["venues"][0]["address"]["line1"]+","+ls.get("selectedIndex")["_embedded"]["venues"][0]["city"]["name"]} </li>
                                        <li>Date:{ls.get("selectedIndex")["dates"]["start"]["localDate"]} </li>
                                        <li>Tickets: Purchase tickets <a href={ls.get("selectedIndex")["url"]}>here</a></li>
</>
                    :
                    <>
                    <li>About: {ls.get("selectedIndex")["eventDescription"]}</li>
                                        <li>Contact Info: {ls.get("selectedIndex")["eventContact"]}</li>
                    <li>Address:{ls.get("selectedIndex")["eventAddress"]}</li>
                                        <li>Date:{ls.get("selectedIndex")["eventDate"]}</li>
</>
                }

                    </ul>
                  </div>
                  {  ls.get("userCreatedEvent")==false?
                  <div style={{paddingTop:'2%'}}>
                          <Map
                              lat={ls.get("selectedIndex")["_embedded"]["venues"][0]["location"]["latitude"]}
                              long={ls.get("selectedIndex")["_embedded"]["venues"][0]["location"]["longitude"]}
                              locations={[]}
                              shopLoc={[]}
                              busStopLoc={[]}
                              atmLoc={[]}
                              style={{height:'80% !important'}}
                            />   
                  </div>:
                          <Map
                              lat={this.state.lat}
                              long={this.state.long}
                              locations={[]}
                              shopLoc={[]}
                              busStopLoc={[]}
                              atmLoc={[]}
                              style={{height:'80% !important'}}
                            />   
                    }
                </div>

            </div>
            </div>
            </div>


 <div className="container" style={{width:'95%',marginTop:'2%'}}>
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
                            <p className="text-secondary text-center">{el.datetime}</p>
                        </div>
                        <div className="col-md-10">
                            <p>
        <a className="float-left" href="https://maniruzzaman-akash.blogspot.com/p/contact.html"><strong>{el.username}</strong></a>
                            </p>
                            <div className="clearfix" />
                            <p>{el.postcontent}</p>
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
          <div className="my-2"></div>
          <Form>
            <fieldset className="form-group">
                <h3>Write a Post:</h3>
                <textarea className="form-control" type="text" ref="comment" id="comment" name="comment" placeholder="write a comment..." rows="5"></textarea>
            </fieldset>
        <button className="btn btn-success pull-right" type="button" onClick={this.addComment}>Post</button>
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
export default EventDetails;