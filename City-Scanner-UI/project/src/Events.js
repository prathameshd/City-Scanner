import React, { Component } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import { Form, Button, Col, Nav, Navbar, useState} from "react-bootstrap";
import localStorage from 'localStorage';


class Events extends Component {
	    constructor(props) {
      super(props);
      this.state = {
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
        eventEndTime:''
      };
this.onFileChangeHandler= this.onFileChangeHandler.bind(this);
this.uploadImage=this.uploadImage.bind(this);
this.changeState3=this.changeState3.bind(this);
this.onChange=this.onChange.bind(this);
this.createEvent=this.createEvent.bind(this);

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

render()
{
	return(
		<div>
		                        <Button className="btn btn-primary" onClick={this.changeState3}>Create Event</Button>

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

  );
}
}
  export default Events;