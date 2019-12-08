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

class Details_Housing extends PureComponent{
  constructor (props){
    super (props);
    this.state={
      place_details:[],
      allComments:[],
      comment:"",
      newPostAdded:false,
      establishments: [],
        shops: [],
        locations: [],
        shopLoc: [],
        busStop: [],
        busStopLoc: [],
        atm: [],
        atmLoc: [],
        lat: " ",
        long: " ",
        showModal1: false,
        updatedComment:"",
        updatedPostId:"",
        image1:"",
        image2:"",
        timing1: "",
        timing2:"",
        timing3:"",
        timing4:"",
        timing5:"",
        timing6:"",
        timing7:""

    };

    this.getCoordinates = this.getCoordinates.bind(this);
    this.getHousing = "";
    this.getShops = this.getShops.bind(this);
    this.getBusStops = this.getBusStops.bind(this);
    this.getAtms = this.getAtms.bind(this);

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
      url: "http://localhost:8080/gethouseposts",
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
  this.getCoordinates();
  this.getShops();
  this.getBusStops();
  this.getAtms();
  this.getPlaceDetails();
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
      //console.log("Place det",response.data.result.photos[0]["photo_reference"])
      console.log("Place det",response.data.result.opening_hours.weekday_text)
      this.setState({
        place_details: response.data.result,
        image1:response.data.result.photos[0]["photo_reference"],
        image2:response.data.result.photos[1]["photo_reference"],
        image3:response.data.result.photos[2]["photo_reference"],
        image4:response.data.result.photos[3]["photo_reference"],
        image5:response.data.result.photos[4]["photo_reference"],
        timing1:response.data.result.opening_hours.weekday_text[0],
        timing2:response.data.result.opening_hours.weekday_text[1],
        timing3:response.data.result.opening_hours.weekday_text[2],
        timing4:response.data.result.opening_hours.weekday_text[3],
        timing5:response.data.result.opening_hours.weekday_text[4],
        timing6:response.data.result.opening_hours.weekday_text[5],
        timing7:response.data.result.opening_hours.weekday_text[6]
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
    "category": "Housing",
    "postsubjectname": ls.get("selectedIndex")["name"],
    "postContent": data
  }

  return axios({
      method: "post",
      url: "http://localhost:8080/savehousepost",
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
  if (ls.get("currentUser") == index["username"])
    this.setState({
      showModal1: true,
      updatedComment: index["postContent"],
      updatedPostId: index["postId"]
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
    "category": "Housing",
    "postsubjectname": index["postsubjectname"],
    "postContent": this.state.updatedComment,
    "postId": this.state.updatedPostId
  }
  return axios({
      method: "post",
      url: "http://localhost:8080/updateHousePost",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      data: postData
    })
    .then(response => {

      this.changeState();
      this.fetchComments();
      ToastsStore.success("Post Updated");

      //change state to re render component
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
    "category": "Housing",
    "postsubjectname": index["postsubjectname"],
    "postContent": this.state.updatedComment,
    "postId": this.state.updatedPostId
  }
  return axios({
      method: "post",
      url: "http://localhost:8080/deleteHousePost",
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

sendNotifications()
{
  var postData = {
    "email": '',
    "cityName": localStorage.getItem("city"),
    "notificationType":"Housing"
  }

  return axios({
      method: "post",
      url: "http://localhost:8080/sendHousingNotifications",
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
       //let opening_hours=this.state.place_details.opening_hours
      //let ref1=this.state.place_details.photos[""0""].photo_reference
      const info=  this.state.place_details
      
      console.log("asvsv",info)
     // let ref1=[]
      //let ref2=[]
      //let ref3=[]
      // for(var i=0; i<info[0].photos.length; i++){
      //   ref1.push(info[0].photos[i].photo_reference)
      //   ref2.push(info[0].photos[i].photo_reference)
      //   ref3.push(info[0].photos[i].photo_reference)
      // }
        let imageurl1="https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference="+this.state.image1+"&key=AIzaSyAJA71Rtblkd6TpFQvsgsnCbOVUqDCf-nc"
        let imageurl2="https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference="+this.state.image2+"&key=AIzaSyAJA71Rtblkd6TpFQvsgsnCbOVUqDCf-nc"
        let imageurl3="https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference="+this.state.image3+"&key=AIzaSyAJA71Rtblkd6TpFQvsgsnCbOVUqDCf-nc"
        let imageurl4="https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference="+this.state.image4+"&key=AIzaSyAJA71Rtblkd6TpFQvsgsnCbOVUqDCf-nc"
        let imageurl5="https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference="+this.state.image5+"&key=AIzaSyAJA71Rtblkd6TpFQvsgsnCbOVUqDCf-nc"

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
            <h1 className="my-4">{ls.get("selectedIndex")["name"]} </h1><br/><br/>
            <div className="row">
                <div className="col-md-7" style={{paddingRight:'50px'}}>

          <Fade >     
          <div >
            <div className="image-container">
            
              <img
                src={imageurl1}
                height="555"
                width="1550"
              />
            </div>
          </div>
          <div >
            <div className="image-container">
                        
              <img
                src={imageurl2}
                height="555"
                width="1550"
              />
            </div>
          </div>
          <div >
            <div className="image-container">
               <img
                src={imageurl3}
                height="555"
                width="1550"
              />
            </div>
          </div>
          <div >
            <div className="image-container">
              <img
                src={imageurl4}
                height="555"
                width="1550"
              />
            </div>
          </div>
          <div >
            <div className="image-container">
              <img
                src={imageurl5}
                height="555"
                width="1550"
              />
            </div>
          </div>
        </Fade>
                    
                </div>
                <div className="col-md-5">
                      <div>
                      <h5 className="my-3" style={{'font-family': 'cursive'}}>Details</h5>
                      <img style={{height:'7%', width:'7%'}} src="https://www.freeiconspng.com/uploads/orange-localization-icon-11.png"/>  {this.state.place_details.formatted_address}
                      <br/><img style={{height:'7%', width:'7%'}} src="https://iconsplace.com/wp-content/uploads/_icons/ffa500/256/png/phone-icon-11-256.png"/>  {this.state.place_details.formatted_phone_number}
                      <br/><img style={{height:'7%', width:'7%'}} src="https://www.flaticon.es/premium-icon/icons/svg/1178/1178509.svg"/>  {this.state.place_details.rating} / 5 
                      <br/><img style={{height:'7%', width:'7%'}} src="https://www.pngtube.com/myfile/detail/176-1761461_website-vector-icon-png-png-download-worldwide-shipping.png"/>  {this.state.place_details.website}
                      <br/><img style={{height:'7%', width:'7%'}} src="https://resources.iacademy.com/49/1110/4440/1464979022/Icon_HoursOfOperationSign-01.png"/><u>Opening Hours:</u><br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.timing1}<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.timing2}<br/> 
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.timing3}<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.timing4}<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.timing5}<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.timing6}<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.timing7}<br/>              
                      
                    </div>

                      <div className="row" style={{paddingTop:'4%'}}>
                                <Map
                                  lat={ls.get("selectedIndex")["geometry"]["location"]["lat"]}
                                  long={ls.get("selectedIndex")["geometry"]["location"]["lng"]}
                                  locations={this.state.locations}
                                  shopLoc={this.state.shopLoc}
                                  busStopLoc={this.state.busStopLoc}
                                  atmLoc={this.state.atmLoc}
                                  style={{height:'100% !important', width:'60%'}}
                                />
                      </div>
                </div>

            </div>
        </div>
        </div>


        <div className="container-fluid" style={{width:'80%',marginTop:'4%'}}>
        {ls.get("currentUser") !=""?

        <div className="row">
        <div className="col-md-7">
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
                            <p>
                            <a className="float-right btn btn-outline-primary ml-2"> <i className="fa fa-reply" /> Reply</a>
                            <a className="float-right btn text-white btn-danger"> <i className="fa fa-heart" /> Like</a>
                            </p>
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
          
          <font face="verdana" color="skyblue">
         <h4> The residents of {ls.get("city")} will help you. <br/>Find their reviews about '{this.state.place_details.name}'.</h4>
         <h3>LOGIN TO SEE POSTS</h3>
         </font>
        </div>
      }
        </div>
        <ToastsContainer store={ToastsStore}/>

            </>
        );
    }
}
export default Details_Housing;
