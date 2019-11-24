import React, { Component } from "react";
import { Form, Button, Col, Nav, Navbar, useState} from "react-bootstrap";
import {bounce} from 'react-animations';
import Modal from 'react-bootstrap/Modal';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import localStorage from 'localStorage';

const Bounce = styled.div`animation: 3s ${keyframes`${bounce}`} infinite`;

class Header extends Component {

    constructor(props) {
    super(props);
    this.state = {
      isLogin:false,
      showModal:false,
      email:"",
      password:""
    };
        this.changeState = this.changeState.bind(this);
         this.sendLoginData = this.sendLoginData.bind(this);
         this.logout=this.logout.bind(this);
  }

 handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

   handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

componentDidMount()
{
        //this.setState({isLogin:localStorage.getItem('isLogin')})
        console.log(localStorage.getItem('isLogin'))
}
changeState()
 {
    this.setState({showModal:!this.state.showModal})
  }

logout()
{
    localStorage.setItem("isLogin","false")
      this.setState({isLogin:false,showModal:false})
      console.log("logout clicked",this.state)
}

sendLoginData()
{
  console.log("--------------",this.state)
    var userCreds={
    email:this.state.email,
    password:this.state.password
  };

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
      localStorage.setItem("isLogin","true");
      alert("Succesful login")
      this.setState({isLogin:true})
    }

    if(response['data'] == "Incorrect Password")
    {
      alert("Wrong Password")
    }
  }).catch(err=>
    {
      alert(err)
      console.log(err)
    })
}

    render() {
      if(localStorage.getItem("isLogin")=="true")
      {
        return(
        <>
              <meta charSet="utf-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                  <meta name="description" content />
                  <meta name="author" content />
                  <title>City Scanner</title>
                  <link href="./vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
                  <link href="./vendor/fontawesome-free/css/all.min.css" rel="stylesheet" />
                  <link href="./vendor/simple-line-icons/css/simple-line-icons.css" rel="stylesheet" type="text/css" />
                  <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic,700italic" rel="stylesheet" type="text/css" />
                  <link href="./css/landing-page.min.css" rel="stylesheet" />
                  <nav className="navbar navbar-light bg-light static-top">
                    <div className="container">
                      <a className="navbar-brand" href="/home">City Scanner</a>
                      <Form>
<ul  class="list-inline">
  <li class="list-inline-item">Welcome</li>
  <li class="list-inline-item"><Button onClick={this.logout}>Logout</Button></li>
</ul>

                     
                                  
                      </Form>
                    </div>
                  </nav>
            </>
          );
      }
      else{
      return (
            <>
              <meta charSet="utf-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                  <meta name="description" content />
                  <meta name="author" content />
                  <title>City Scanner</title>
                  <link href="./vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
                  <link href="./vendor/fontawesome-free/css/all.min.css" rel="stylesheet" />
                  <link href="./vendor/simple-line-icons/css/simple-line-icons.css" rel="stylesheet" type="text/css" />
                  <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic,700italic" rel="stylesheet" type="text/css" />
                  <link href="./css/landing-page.min.css" rel="stylesheet" />
                  <nav className="navbar navbar-light bg-light static-top">
                    <div className="container">
                      <a className="navbar-brand" href="/home">City Scanner</a>
                      <Form>
                     
            
                      <Button onClick={this.changeState} show={this.state.isLogin}>Login</Button>
                       
                       <Modal style={{zIndex:50000}} show={this.state.showModal} onHide={this.changeState}>
                       <Form style = {{padding:'20px'}}>
            <Form.Group controlId="Header">
                <h1 style={{textAlign:"center"}}>Login</h1>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label style={{fontSize:18}}>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email"  value={this.state.email}               onChange={this.handleEmailChange} />
              </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label style={{fontSize:18}}>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
            </Form.Group>
            <Button style = {{float:'right'}} variant="primary" type="Button" onClick={this.sendLoginData}>
              Login
            </Button>
          </Form>
                       </Modal>


                              &nbsp;&nbsp;&nbsp;
                              <Signup/>
                      </Form>
                    </div>
                  </nav>
            </>
          );
        }
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
      localStorage.setItem('name', userCreds['email']);
      handleClose();
      sendLoginData();
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Login
        </Button>
        <Modal style={{zIndex:50000}} show={show} onHide={handleClose}>
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
      localStorage.setItem('isLogin',true);
      alert("Succesful login")
    }

    if(response['data'] == "Incorrect Password")
    {
      alert("Wrong Password")
    }
  }).catch(err=>
    {
      alert(err)
      console.log(err)
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
      sendEmail(newUserData);
    }



    //reload page after login success
  }).catch(err=>
    {

    })
}

const sendEmail= (user)=> {
  console.log(user)
          return axios
      ({
        method:'post',
        url:'http://localhost:8080/welcomeEmail',
        headers:{'Access-Control-Allow-Origin':'*'},
        data:user
      })
      .then((response)=>{
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
        <Button variant="primary" onClick={handleShow}>
          Signup
        </Button>

        <Modal style={{zIndex:50000}} show={show} onHide={handleClose}>
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