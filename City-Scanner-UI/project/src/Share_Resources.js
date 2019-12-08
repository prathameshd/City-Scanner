import React, { Component } from "react";
import { Form } from 'react-bootstrap';

export default class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
         <div style={{ background: "gray url(https://i.pinimg.com/originals/05/7b/2b/057b2be2e40c928f071a47a50769cdf6.jpg)"}}> 
             <font align="center" face="Comic sans MS" color="#8ebf42"><h3>WE MAKE A LIVING BY WHAT WE GET, WE MAKE A LIFE BY WHAT WE GIVE.</h3></font><br></br>
             <h4>Please fill up the following and submit to make people know that you want help them by sharing your belonging. </h4>
        <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>What is your email address?</Form.Label>
    <Form.Control type="email" placeholder="Enter email" width='3' />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicName">
    <Form.Label>What is your name?</Form.Label>
    <Form.Control type="name" placeholder="Enter name" />
  </Form.Group>

  <Form.Group controlId="formBasicResource">
    <Form.Label>What would you like to share?</Form.Label>
    <Form.Control type="text" placeholder="Enter resource you want to share" />
  </Form.Group>

  <Form.Group controlId="formBasicCheckbox">
  <Form.Label>What would you like to give the resource for free?</Form.Label>
    <Form.Check type="checkbox" label="Yes" /> 
    <Form.Check type="checkbox" label="No" />
  </Form.Group>

  <Form.Group controlId="formBasicCost">
    <Form.Label>What is the cost of resource?</Form.Label>
    <Form.Control type="text" placeholder="Enter cost of resource" />
  </Form.Group>

  <Form.Group controlId="formBasicContact">
    <Form.Label>Whom and how to contact?</Form.Label>
    <Form.Control type="text" placeholder="Enter cost of resource" />
  </Form.Group>

  <Form.Group controlId="formBasicAddr">
    <Form.Label>From where can the resource be collected?</Form.Label>
    <Form.Control type="text" placeholder="Enter place from where resource can be collected" />
  </Form.Group>

  <button className="btn btn-success" variant="primary" type="submit">
    Submit
  </button>
</Form>
</div>
      );
    }
  }