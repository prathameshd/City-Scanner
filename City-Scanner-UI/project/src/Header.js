import React, { Component } from "react";
import { Form, Button, Col, Nav, Navbar, useState} from "react-bootstrap";
import {bounce} from 'react-animations';
import Modal from 'react-bootstrap/Modal';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
const Bounce = styled.div`animation: 3s ${keyframes`${bounce}`} infinite`;

class Header extends Component {
    render() {
      return (
            <>
                <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="#home"><Bounce>City Scanner</Bounce></Navbar.Brand>
                <Nav className="mr-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#features">About Us</Nav.Link>
                </Nav>
                <Form>
                    <Login/>
                    &nbsp;&nbsp;&nbsp;
                    <Signup/>
                </Form>
              </Navbar> 
            </>
          );
        }        
  }
  var userCreds={
    email:"",
    password:""
  };

  function Login() {
    const [show, setShow] = React.useState(false);

    const [loginEmailVal, setEmail] = React.useState("");
    const [loginPasswordVal, setPassword] = React.useState("");

    userCreds["email"]=loginEmailVal;
    userCreds["password"]=loginPasswordVal;

    function click()
    {
      handleClose();
      sendLoginData();
    }
    
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="outline-info" onClick={handleShow}>
          Login
        </Button> 
        <Modal show={show} onHide={handleClose}>
        <Form style = {{padding:'20px'}}>
            <Form.Group controlId="Header">
                <h1 style={{textAlign:"center"}}>Login</h1>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label style={{fontSize:18}}>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
              </Form.Group>
  
            <Form.Group controlId="formBasicPassword">
              <Form.Label style={{fontSize:18}}>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            </Form.Group>
            <Button style = {{float:'right'}} variant="primary" type="submit" onClick={click}>
              Login
            </Button>
          </Form>
        </Modal>
      </>
    );
  }
const sendLoginData= ()=> {
  return axios
  ({
    method:'post',
    url:'http://localhost:8080/login',
    headers:{'Access-Control-Allow-Origin':'*'},
    data:userCreds
  })
  .then((response)=>{
    if(response['data'] == "Incorrect Username")
    {
      alert("Please sign up")
    }
    
    if(response['data'] == "Login Success")
    {
      alert("Succesful login")
    }

    if(response['data'] == "Incorrect Password")
    {
      alert("Wrong Password")
    }
  }).catch(err=>
    {
      alert("Username or Password is wrong")
    })
}

const createNewUser= ()=> {
  return axios
  ({
    method:'post',
    url:'http://localhost:8080/signUp',
    headers:{'Access-Control-Allow-Origin':'*'},
    data:newUserData
  })
  .then((response)=>{
  
    if(response['data']=='success')
    {
      alert("new user created");
      return axios
      ({
        method:'post',
        url:'http://localhost:8080/sendmail',
        headers:{'Access-Control-Allow-Origin':'*'},
        data:newUserData
      })
      .then((response)=>{
      }).catch(err=>
        {
         
        })
    }
    if(response['data']=='failure')
    {
      alert("User already present");
    } 
    



    //reload page after login success
  }).catch(err=>
    {

    })
}

var newUserData={
  "email": "",
  "password": "",
  "firstName": "",
  "lastName": "",
  "contactNumber": "",
  "points": 0
};

  function Signup() {
    const [show, setShow] = React.useState(false);

    const [siginupEmailVal, setEmail] = React.useState("");
    const [siginupPasswordVal, setPassword] = React.useState("");
    const [siginupFirstNameVal, setFirstName] = React.useState("");
    const [siginupLastNameVal, setLastName] = React.useState("");
    const [siginupContactVal, setContact] = React.useState("");
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    newUserData["email"]=siginupEmailVal;
    newUserData["password"]=siginupPasswordVal;
    newUserData["firstName"]=siginupFirstNameVal;
    newUserData["lastName"]=siginupLastNameVal;
    newUserData["contactNumber"]=siginupContactVal;

    function click()
    {
      handleClose();
      createNewUser();
    }
  
    return (
      <>
        <Button variant="outline-info" onClick={handleShow}>
          Signup
        </Button>
  
        <Modal show={show} onHide={handleClose}>
        <Form style = {{padding:'20px'}}>
              <Form.Group controlId="Header">
                  <h1 style={{textAlign:"center"}}>Sign Up</h1>
              </Form.Group>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail"> 
                <Form.Label style={{fontSize:18}}>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
              </Form.Group>
          
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label style={{fontSize:18}}>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
              </Form.Group>
            </Form.Row>
          
            <Form.Group controlId="formGridFirstName">
              <Form.Label style={{fontSize:18}}>First Name</Form.Label>
              <Form.Control placeholder="" onChange={e => setFirstName(e.target.value)}/>
            </Form.Group>
          
            <Form.Group controlId="formGridLastName">
              <Form.Label style={{fontSize:18}}>Last Name</Form.Label>
              <Form.Control placeholder="" onChange={e => setLastName(e.target.value)}/>
            </Form.Group>
          
            <Form.Row>
              <Form.Group as={Col} controlId="formGridContact">
                <Form.Label style={{fontSize:18}}>Contact</Form.Label>
                <Form.Control onChange={e => setContact(e.target.value)}/>
              </Form.Group>
          
            </Form.Row> 
          
            <Button style = {{float:'right'}} variant="primary" type="submit" onClick={click}>
              Sign Up
            </Button>
          </Form>
        </Modal>
      </>
    );
  }
 
  export default Header