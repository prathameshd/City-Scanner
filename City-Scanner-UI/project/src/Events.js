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
import { MDBCol, MDBBtn } from "mdbreact";
import Events2 from "./event2.png"


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
      showModal:false,
      showModal1:false,
      eventTitle:'',
      eventId:"",
			eventDescription:'',
			eventContact:'',
			eventAddress:'',
			eventImage:'',
			eventDate:'',
			eventStartTime:'',
			eventEndTime:'',
			eventCity:'',
			userEvents:[]
    };
    this.getCoordinates = this.getCoordinates.bind(this);
    this.getEvents = this.getEvents.bind(this);
		this.onFileChangeHandler= this.onFileChangeHandler.bind(this);
		this.uploadImage=this.uploadImage.bind(this);
    this.displayModalBox=this.displayModalBox.bind(this);
    this.displayUpdateModalBox=this.displayUpdateModalBox.bind(this);
		this.onChange=this.onChange.bind(this);
    this.createEvent=this.createEvent.bind(this);
    this.updateEvent=this.updateEvent.bind(this);
    this.deleteEvent=this.deleteEvent.bind(this);
				this.getUserEvents=this.getUserEvents.bind(this);
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
        this.setState({ lat: response.data.lat });
        this.setState({ long: response.data.long });
      })
      .catch(err => {
        console.log(err);
      });
  }

//Method to retrieve events in city from API
  getEvents() {
    return axios({
      method: "post",
      url: "http://localhost:8080/getEvent",
      headers: { "Access-Control-Allow-Origin": "*" },
      data: ls.get("city")
    })
      .then(response => {
        console.log("ggggggggggggggggggggg"+JSON.stringify(response.data._embedded.events));
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
    this.getUserEvents();
  }

	onFileChangeHandler = (e) => {
        e.preventDefault();
        this.setState({
            selectedFile: e.target.files[0]
        });


    };

//Method to change states
        onChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

//Method to upload image when new event is being created
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

//Method to toggle Create event modal box
        displayModalBox() {
      this.setState({
        showModal: !this.state.showModal
      })
    }

    displayUpdateModalBox() {
      this.setState({
        showModal1: !this.state.showModal1
      })
    }

//Method to create new event by user
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
    	      return axios({
          method: 'post',
          url: 'http://localhost:8080/addEvent',
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          data: postData
        })
        .then((response) => {
        	this.displayModalBox();
        	    this.getUserEvents();


        }).catch(err => {

        })
    }


    //Method to update event by user
    updateEvent()
    {
      console.log(this.state.eventId)
    	var postData={
        "eventId":this.state.eventId,
    		"eventTitle":this.state.eventTitle,
    		"eventDescription":this.state.eventDescription,
    		"eventDate":this.state.eventDate,
    		"eventAddress":this.state.eventAddress,
    		"eventCity":ls.get("city"),
    		"eventContact":this.state.eventContact,
    		"eventStartTime":this.state.eventStartTime,
    		"eventEndTime":this.state.eventEndTime,
    	}
    	      return axios({
          method: 'post',
          url: 'http://localhost:8080/updateEvent',
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          data: postData
        })
        .then((response) => {
        	this.displayUpdateModalBox();
        	this.getUserEvents();
        }).catch(err => {

        })
    }


    //Method to delete event by user
    deleteEvent()
    {
      var postData={
        "eventId":this.state.eventId,
    		"eventTitle":this.state.eventTitle,
    		"eventDescription":this.state.eventDescription,
    		"eventDate":this.state.eventDate,
    		"eventAddress":this.state.eventAddress,
    		"eventCity":ls.get("city"),
    		"eventContact":this.state.eventContact,
    		"eventStartTime":this.state.eventStartTime,
    		"eventEndTime":this.state.eventEndTime,
    	}
    	      return axios({
          method: 'post',
          url: 'http://localhost:8080/deleteEvent',
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          data: postData
        })
        .then((response) => {
        	this.displayUpdateModalBox();
        	this.getUserEvents();
        }).catch(err => {

        })
     
    }

//Method to get all user created events for city
    getUserEvents()
    {
      var postData = {
        "eventCity": ls.get('city'),
    }
      console.log(ls.get('city'))
    	    	      return axios({
          method: 'post',
          url: 'http://localhost:8080/getEventsForCity',
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          data: postData
        })
        .then((response) => {
        	console.log("user events"+JSON.stringify(response))
        	      this.setState({
        userEvents: response.data
      })

        }).catch(err => {

        })
    }

    handleChildClick(e, index) {
      e.stopPropagation();
      console.log('child');
      console.log(index['eventId']);
      
      this.displayUpdateModalBox();

      this.setState({
      eventId:index['eventId'],
      eventTitle:index['eventTitle'],
			eventDescription:index['eventDescription'],
			eventContact:index['eventContact'],
			eventAddress:index['eventAddress'],
			eventDate:index['eventDate'],
			eventStartTime:index['eventStartTime'],
			eventEndTime:index['eventEndTime'],
		  })
    }
    

//Method to redirect to Event Details page

      handleClick(index) {
    ls.set("selectedIndex", index);
    ls.set("userCreatedEvent",false);
          window.location.href="/EventDetails"
  }

  //Method to redirect to Event Details page
      handleClickForUserEvents(index) {
   
    ls.set("selectedIndex", index);
    ls.set("userCreatedEvent",true);
          window.location.href="/EventDetails"
  }

  render() {
    if (ls.get("city") == null) {
      window.location.href = "/home";
    } else if (this.state.lat != " " && this.state.long != " ") {
      return (
        <div className="containter-fluid" style={{width:'90%',marginLeft:'5%'}}>
        <div className="row">

                  <div className="col-sm-12" style={{textAlign:'center',paddingTop:'2%',paddingBottom:'1%'}}><font size="6">Events happening around {ls.get("city")}</font>
                  </div>
       
        </div>

        <div className="row">
					<div className="col-sm-10">
        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
		  <Tab eventKey="home" title="Explore">
      <div className="row">
            {this.state.events.map((el, i) => (
              <div
                style={{
                  display: "inline-block",
                  marginBottom: 5,
                  marginRight: 12,
                  marginLeft: 90,
                  paddingTop: "10px",
                  fontColor: "black"
                }}
              >
                <Card onClick={this.handleClick.bind(this, el)}>
                  <CardActionArea>
                    <div>
                      <div className="card float-right" style={{ width: 470,height:150 }}>
                        <div className="row">
                          <div className="col-sm-5">
                            <img
                              className="d-block w-100"
                              src={Events2}
                              alt=""
                              style={{paddingTop:"13%", paddingRight:"10%"}}
                            />
                          </div>
                          <div className="col-sm-7" style={{ marginTop: 10 }}>
                            <div className="card-block">
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="h3"
                              >
                                {el.name.substring(0, 35)}
                              </Typography>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="h1"
                              >
                              </Typography>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                              >
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
      <div className="row">
            {this.state.userEvents.map((el, i) => (
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
                                <Card onClick={this.handleClickForUserEvents.bind(this, el)}>
                  <CardActionArea>
                    <div>
                      <div className="card float-right" style={{ width: 470,height:150 }}>
                        <div className="row">
                          <div className="col-sm-5">
                            <img
                              className="d-block w-100"
                              src={Events2}
                              alt=""
                              style={{paddingTop:"13%", paddingRight:"10%"}}
                            />
                          </div>
                          <div className="col-sm-7" style={{ marginTop: 10 }}>
                            <div className="card-block">
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="h3"
                              >
                                {el.eventTitle}
                              </Typography>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="h1"
                              >
                              </Typography>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                              >
                              </Typography>
                              <div style={{paddingTop:'20%'}}>
                                {ls.get("currentUser")==el.userEmail
                                  ? <button className="float-right btn btn-error" onClick={(e) => {this.handleChildClick(e, el)}} >Edit</button>
                                  : null
                                }
                            </div>
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
			</Tabs>
			</div>
			         <div className="col-sm-2">
        			{ls.get("currentUser")!=""?
					                    <MDBBtn><a style={{float:"right"}} className="btn btn-error" onClick={this.displayModalBox}>Create Your Event</a></MDBBtn>:<p>Login to create events</p>}
					</div>
        </div>
        <div className="row">
		

				<Modal style={{zIndex:50000,top:'5%'}} show={this.state.showModal1} onHide={this.displayUpdateModalBox}>
				<div className="container" style={{padding:'5%'}}>
				<Form style = {{padding:'20px'}}>
				<Form.Group controlId="Header">
						<h1 style={{textAlign:"center"}}>Update Event</h1>
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

				
        <Button style = {{float:'right'}} variant="danger" type="Button" onClick={this.deleteEvent}>
				Delete
				</Button>
        
        &nbsp; &nbsp; &nbsp;
        &nbsp; &nbsp; &nbsp;

        <Button style = {{float:'right'}} variant="primary" type="Button" onClick={this.updateEvent}>
				Update
				</Button>
        
        </Form>
				</div>
				</Modal>
					</div>

					<div className="row">
		

				<Modal style={{zIndex:50000,top:'5%'}} show={this.state.showModal} onHide={this.displayModalBox}>
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
