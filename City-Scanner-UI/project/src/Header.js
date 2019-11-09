import React, { Component } from "react";
import { Form, Button, FormGroup, FormControl, ControlLabel, Col, Nav, Navbar, useState} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';


class Header extends Component {
    render() {
      return (
            <>
                <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="#home">City Scanner</Navbar.Brand>
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

  function Login() {
    const [show, setShow] = React.useState(false);
  
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
              <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
  
            <Form.Group controlId="formBasicPassword">
              <Form.Label style={{fontSize:18}}>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button style = {{float:'right'}} variant="primary" type="submit" onClick={handleClose}>
              Login
            </Button>
          </Form>
        </Modal>
      </>
    );
  }

  function Signup() {
    const [show, setShow] = React.useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
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
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
          
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label style={{fontSize:18}}>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Form.Row>
          
            <Form.Group controlId="formGridFirstName">
              <Form.Label style={{fontSize:18}}>First Name</Form.Label>
              <Form.Control placeholder="" />
            </Form.Group>
          
            <Form.Group controlId="formGridLastName">
              <Form.Label style={{fontSize:18}}>Last Name</Form.Label>
              <Form.Control placeholder="" />
            </Form.Group>
          
            <Form.Row>
              <Form.Group as={Col} controlId="formGridContact">
                <Form.Label style={{fontSize:18}}>Contact</Form.Label>
                <Form.Control />
              </Form.Group>
          
            </Form.Row>
          
            <Button style = {{float:'right'}} variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
        </Modal>
      </>
    );
  }
  
  export default Header