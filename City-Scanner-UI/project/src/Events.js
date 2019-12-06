import React, { Component } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import ls from "local-storage";
import { Form, Button, Col, Nav, Navbar, useState,Tab,Tabs} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      locations: [],
      lat: " ",
      long: " ",
			selectedFile: '',
			imageName:'',
			showModal3:false,
			eventTitle:'',
			eventDescription:'',
			eventContact:'',
			eventAddress:'',
			eventImage:'',
			eventDate:'',
			eventStartTime:'',
			eventEndTime:'',
			eventCity:''
    };
    this.getCoordinates = this.getCoordinates.bind(this);
    this.getEvents = this.getEvents.bind(this);
		this.onFileChangeHandler= this.onFileChangeHandler.bind(this);
		this.uploadImage=this.uploadImage.bind(this);
		this.changeState3=this.changeState3.bind(this);
		this.onChange=this.onChange.bind(this);
		this.createEvent=this.createEvent.bind(this);
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

	onFileChangeHandler = (e) => {
        e.preventDefault();
        this.setState({
            selectedFile: e.target.files[0]
        });


    };

        onChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

    uploadImage()
    {
    	const formData = new FormData();
        formData.append('file', this.state.selectedFile);

      return axios({
          method: 'post',
          url: 'http://localhost:8080/uploadFile',
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          data: formData
        })
        .then((response) => {
        	        this.setState({
            imageName: response["data"]
        });
        }).catch(err => {

        })
    }

        changeState3() {
      this.setState({
        showModal3: !this.state.showModal3
      })
    }

    createEvent()
    {
    	var postData={
    		"userEmail":localStorage.getItem("currentUser"),
    		"eventTitle":this.state.eventTitle,
    		"eventDescription":this.state.eventDescription,
    		    		"eventDate":this.state.eventDate,

    		"eventAddress":this.state.eventAddress,
    		"eventCity":ls.get("city"),
    		"eventContact":this.state.eventContact,
    		"eventStartTime":this.state.eventStartTime,
    		"eventEndTime":this.state.eventEndTime,
    		    		"eventImage":this.state.imageName,

    	}

    	console.log("data for adding event"+JSON.stringify(postData))

    	      return axios({
          method: 'post',
          url: 'http://localhost:8080/addEvent',
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          data: postData
        })
        .then((response) => {

        }).catch(err => {

        })


    }

  render() {
    if (ls.get("city") == null) {
      window.location.href = "/home";
    } else if (this.state.lat != " " && this.state.long != " ") {
      return (
        <div className="containter-fluid">
        <div className="row">
                  <div className="col-sm-9"><h3>Events around {ls.get("city")}</h3>
                  </div>
                  <div className="col-sm-3">
        			{ls.get("currentUser")!=""?
					<Button style={{float:"right"}} className="btn btn-primary" onClick={this.changeState3}>Create Your Event</Button>:null}
					</div>
        </div>

        <div className="row">
        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
		  <Tab eventKey="home" title="Explore">
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

          </Tab>
		  <Tab eventKey="profile" title="Events Around You">
		  </Tab>
			</Tabs>
        </div>
					<div className="row">
		

				<Modal style={{zIndex:50000,top:'5%'}} show={this.state.showModal3} onHide={this.changeState3}>
				<div className="container" style={{padding:'5%'}}>
				<Form style = {{padding:'20px'}}>
				<Form.Group controlId="Header">
						<h1 style={{textAlign:"center"}}>Create Event</h1>
				</Form.Group>
				<Form.Row>


				<Form.Group as={Col} controlId="formGridPassword">
					<Form.Label style={{fontSize:18}}>Title</Form.Label>
					<Form.Control placeholder="" value={this.state.eventTitle} name="eventTitle"  onChange={this.onChange} />
				</Form.Group>
				</Form.Row>

				<Form.Group controlId="formGridFirstName">
				<Form.Label style={{fontSize:18}}>Description</Form.Label>
				<Form.Control placeholder="" value={this.state.eventDescription} name="eventDescription" onChange={this.onChange} />
				</Form.Group>

															<Form.Group controlId="formGridFirstName">
				<Form.Label style={{fontSize:18}}>Address</Form.Label>
				<Form.Control placeholder="" value={this.state.eventAddress} name="eventAddress" onChange={this.onChange} />
				</Form.Group>

															<Form.Group controlId="formGridFirstName">
				<Form.Label style={{fontSize:18}}>Contact</Form.Label>
				<Form.Control placeholder="" value={this.state.eventContact} name="eventContact" onChange={this.onChange} />
				</Form.Group>

																											<Form.Group controlId="formGridFirstName">
				<Form.Label style={{fontSize:18}}>Date</Form.Label>
				<Form.Control type="date" placeholder="" value={this.state.eventDate} name="eventDate" onChange={this.onChange} />
				</Form.Group>


																											<Form.Group controlId="formGridFirstName">
				<Form.Label style={{fontSize:18}}>Start Time</Form.Label>
				<Form.Control type="time" placeholder="" value={this.state.eventStartTime} name="eventStartTime" onChange={this.onChange} />
				</Form.Group>

																																							<Form.Group controlId="formGridFirstName">
				<Form.Label style={{fontSize:18}}>End Time</Form.Label>
				<Form.Control type="time" placeholder="" value={this.state.eventEndTime} name="eventEndTime" onChange={this.onChange} />
				</Form.Group>

															<Form.Group controlId="formGridFirstName">

				<input type="file" name="file" onChange={this.onFileChangeHandler}/>
				<button type="button" onClick={this.uploadImage} >Submit</button>
				</Form.Group>

				<Button style = {{float:'right'}} variant="primary" type="Button" onClick={this.createEvent}>
				Create Event
				</Button>
				</Form>
				</div>
				</Modal>
					</div>

          
        </div>
      );
    } else {
      return <></>;
    }
  }
}

export default Events;
