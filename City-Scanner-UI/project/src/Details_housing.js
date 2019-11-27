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
import {Formik, Field, ErrorMessage} from 'formik'
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
      Comment:""
    };
    this.getPlaceDetails = this.getPlaceDetails.bind(this);

  }
    componentDidMount(){
        console.log("---------------", ls.get("selectedIndex"));
        console.log("****",ls.get("selectedIndex")["name"]);
        //console.log("Photos",ls.get("selectedIndex")["photos"][0]["photo_reference"]);
        console.log("Place id",ls.get("selectedIndex")["place_id"]);
        this.getPlaceDetails();
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

    onSubmit(values){
      console.log(values);
    }
    render(){
       let Comment=this.state.Comment 
        return (
            <>
    <div className="container" >
    <h1 style={{textAlign: "center"}}>Housing: {ls.get("selectedIndex")["name"]}</h1>
    
    </div>
    <div className="address">
        <h3 style={{color:'pink'}}><u>Address</u>: {ls.get("selectedIndex")["vicinity"]}</h3>
        <br/>
        <h2 style={{color: "violet"}}><u>Rating</u>: {ls.get("selectedIndex")["rating"]}/10</h2>
    </div>
    <div style={{marginLeft:200, marginRight:330}}>
    <Fade {...fadeProperties}>
        
          <div className="each-fade">
            <div className="image-container">
            <h1 style={{top:150,left:350,color:'white',position:'absolute'}}></h1>
            
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/singapore.jpg"
                height="400"
                width="1000"
              />
            </div>
          </div>
          <div className="each-fade">
            <div className="image-container">
                        <h1 style={{top:150,left:350,color:'black',position:'absolute'}}></h1>
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/prague.jpg"
                height="400"
                width="1000"
              />
            </div>
          </div>
          <div className="each-fade">
            <div className="image-container">
                                    <h1 style={{top:150,left:350,color:'#8B008B',position:'absolute'}}></h1>
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/paris.jpg"
                height="400"
                width="1000"
              />
            </div>
          </div>
          <div className="each-fade">
            <div className="image-container">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/amsterdam.jpg"
                height="400"
                width="1000"
              />
            </div>
          </div>
          <div className="each-fade">
            <div className="image-container">
              <img
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/moscow.jpg"
                height="400"
                width="1000"
              />
              
            </div>
            
          </div>
        </Fade>
        
        </div>
        <div className="container">
        <Formik 
        
        onSubmit={this.onSubmit}
       

        >
            {
                (props) => (
                    <Form>
                       
                        <fieldset className="form-group">
                            <label>Comments:</label>
                            <Field className="form-control" type="text" name="Comment"></Field>
                        </fieldset>
                        
                        <button className="btn btn-success" type="submit">Comment</button>
                    </Form>
                    
                )
            }
        </Formik>

      </div>
        
            </>
        );
    }
}
export default Details_Housing;