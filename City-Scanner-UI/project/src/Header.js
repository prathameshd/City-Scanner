import React, { Component } from "react";
import { Form, Button, Col, Nav, Navbar, useState} from "react-bootstrap";
import {bounce} from 'react-animations';
import Modal from 'react-bootstrap/Modal';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import localStorage from 'localStorage';
import {ToastsContainer, ToastsStore} from 'react-toasts';

const Bounce = styled.div`animation: 3s ${keyframes`${bounce}`} infinite`;

class Header extends Component {

    constructor(props) {
      super(props);
      this.state = {
        isLogin: false,
        showModal1: false,
        showModal2: false,
        showModal3: false,
        email: "",
        password: "",
        newEmail: "",
        newPassword: "",
        newFirstName: "",
        newLastName: "",
        newContact: "",
        HousingBoxChecked:false,
        EventsBoxChecked:false
      };
      this.changeState = this.changeState.bind(this);
      this.changeState2 = this.changeState2.bind(this);
      this.changeState3 = this.changeState3.bind(this);

      this.sendLoginData = this.sendLoginData.bind(this);
      this.logout = this.logout.bind(this);
      this.sendEmail = this.sendEmail.bind(this);
      this.createNewUser = this.createNewUser.bind(this);
      this.onChange = this.onChange.bind(this);
      this.subscribeUser= this.subscribeUser.bind(this);
            this.addSubscription= this.addSubscription.bind(this);
            this.removeSubscription= this.removeSubscription.bind(this);
            this.getUserNotificationStatus= this.getUserNotificationStatus.bind(this);
            this.changeCheckbox1= this.changeCheckbox1.bind(this);
            this.changeCheckbox2= this.changeCheckbox2.bind(this);


    }

    handleEmailChange = event => {
      this.setState({
        email: event.target.value
      });
    };

    handlePasswordChange = event => {
      this.setState({
        password: event.target.value
      });
    };

    componentDidMount() {
      //localStorage.setItem("page","Dashboard")
      console.log(localStorage)
    }



    onChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

    changeState() {
      this.setState({
        showModal1: !this.state.showModal1
      })
      this.setState({
        showModal2: false
      })
    }

    changeState2() {
      this.setState({
        showModal2: !this.state.showModal2
      })
      this.setState({
        showModal1: false
      })
    }

    logout() {
      localStorage.setItem("isLogin", "false");
      localStorage.setItem("currentUser","");
      this.setState({
        isLogin: false,
        showModal1: false
      })
      ToastsStore.success("Successful Log Out");
          window.location.reload(); 

    }

    sendLoginData() {
      var userCreds = {
        email: this.state.email,
        password: this.state.password
      };

      return axios({
          method: 'post',
          url: 'http://localhost:8080/login',
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          data: userCreds
        })
        .then((response) => {
          if (response['data'] == "Incorrect Username") {
            ToastsStore.error("Incorrect Credentials. Please Enter Valid Email and Password");
          }

          if (response['data'] == "Login Success") {
            localStorage.setItem("isLogin", "true");
            localStorage.setItem("currentUser",this.state.email);
            ToastsStore.success("Successful Log In");
            window.location.reload();

            this.setState({
              isLogin: true
            })
          }

          if (response['data'] == "Incorrect Password") {
            ToastsStore.error("Incorrect Credentials. Please Enter Valid Email and Password");
          }
        }).catch(err => {
          alert(err)
          console.log(err)
        })
    }

    createNewUser() {

      var newUserData = {
        "email": this.state.newEmail,
        "password": this.state.newPassword,
        "firstName": this.state.newFirstName,
        "lastName": this.state.newLastName,
        "contactNumber": this.state.newContact,
        "points": 0
      };

      return axios({
          method: 'post',
          url: 'http://localhost:8080/signUp',
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          data: newUserData
        })
        .then((response) => {

          if (response['data'] == 'success') {
            this.sendEmail(newUserData);
            this.changeState2();
          }
        }).catch(err => {

        })
    }

    sendEmail(user) {
      return axios({
          method: 'post',
          url: 'http://localhost:8080/welcomeEmail',
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          data: user
        })
        .then((response) => {

        }).catch(err => {

        })
    }

    changeState3() {
            this.getUserNotificationStatus();
      this.setState({
        showModal3: !this.state.showModal3
      })
    }

    subscribeUser(){
//    alert(this.refs.Housingbox.checked);
    if(this.refs.Housingbox.checked==true)
    {
      var tempType="Housing";
      this.addSubscription(tempType);
    }

    if(this.refs.Eventsbox.checked==true)
    {
      var tempType="Events";
      this.addSubscription(tempType);
    }

    if(this.refs.Housingbox.checked==false)
    {
      var tempType="Housing";
      this.removeSubscription(tempType);
    }

    if(this.refs.Eventsbox.checked==false)
    {
      var tempType="Events";
      this.removeSubscription(tempType);
    }

      // var user=localStorage.getItem("currentUser");
      // var city=localStorage.getItem("city");
      // var type = "Housing";
      // var postData = {
      //   "email": localStorage.getItem("currentUser"),
      //   "cityName": localStorage.getItem("city"),
      //   "notificationType":"Housing"
      // }
      // console.log("**********"+postData)

      // return axios({
      //     method: "post",
      //     url: "http://localhost:8080/addUserForNotifications",
      //     headers: {
      //       "Access-Control-Allow-Origin": "*"
      //     },
      //     data: postData
      //   })
      //   .then(response => {
      //     this.changeState3();
      //   })
      //   .catch(err => {
      //     console.log("error " + err);
      //   });

    }

    addSubscription(tempType)
    {
      var postData = {
        "email": localStorage.getItem("currentUser"),
        "cityName": localStorage.getItem("city"),
        "notificationType":tempType
      }

      return axios({
          method: "post",
          url: "http://localhost:8080/addUserForNotifications",
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
          data: postData
        })
        .then(response => {
                this.setState({
        showModal3: false
      })
        ToastsStore.success("Notifications Successfully Updated");

        })
        .catch(err => {
          console.log("error " + err);
        });
    }

    removeSubscription(tempType)
    {
      var postData = {
        "email": localStorage.getItem("currentUser"),
        "cityName": localStorage.getItem("city"),
        "notificationType":tempType
      }
      return axios({
          method: "post",
          url: "http://localhost:8080/removeUserFromNotifications",
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
          data: postData
        })
        .then(response => {
                          this.setState({
        showModal3: false
      })
                  ToastsStore.success("Notifications Successfully Updated");
        })
        .catch(err => {
          console.log("error " + err);
        });
    }

getUserNotificationStatus()
{
        var postData = {
        "email": localStorage.getItem("currentUser"),
        "cityName": localStorage.getItem("city"),
        "notificationType":""
      }
        return axios({
          method: "post",
          url: "http://localhost:8080/getUserNotifications",
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
          data: postData
        })
        .then(response => {
          console.log("user notificaiotn status"+JSON.stringify(response.data))
        this.setState({
        HousingBoxChecked: false,
        EventsBoxChecked:false
      })

for(let i = 0; i < response.data.length; i++){
  //alert(response.data[i].notificationType);
  if(response.data[i].notificationType=='Housing')
  {
      this.setState({
        HousingBoxChecked: true
      })
   }

     if(response.data[i].notificationType=='Events')
  {
      this.setState({
        EventsBoxChecked: true
      })
   }

  //console.log(JSON.stringify(response.data[i].notificationType));
}
        })
        .catch(err => {
          console.log("error " + err);
        });
}

  changeCheckbox1() {
      this.setState({
        HousingBoxChecked: !this.state.HousingBoxChecked
      });
    }

      changeCheckbox2() {
      this.setState({
        EventsBoxChecked: !this.state.EventsBoxChecked
      });
    }

    render() {
      if(localStorage.getItem("isLogin")=="true")
      {
        return(
        <div>
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
                    <div className="container-fluid">
                      <a className="navbar-brand" href="/home">City Scanner</a>

                      <Form>
                      <ul  class="list-inline">
                                                <li class="list-inline-item"><a className="btn btn-error" >Profile</a></li>
                        <li class="list-inline-item"><a className="btn btn-error" onClick={this.changeState3}>Notifications</a></li>
                        <Modal style={{zIndex:50000,top:'40%'}} show={this.state.showModal3} onHide={this.changeState3}>
                        <div className="container" style={{padding:'5%'}}>
                        
                        <h3>Manage Notifications</h3><br/>
                        <h6>Get Email Notifications</h6>
                        {localStorage.getItem("city")?
                        <>
                      <Form>
                      <input type="checkbox" ref="Housingbox" checked={this.state.HousingBoxChecked} name="HousingBoxChecked" onChange={this.changeCheckbox1}/>Housing Posts <br/>
                      <input type="checkbox" ref="Eventsbox" checked={this.state.EventsBoxChecked}  name="EventsBoxChecked" onChange={this.changeCheckbox2}/> Events<br/>

                      </Form>
                    <button style={{float:"right"}} className="btn btn-primary" onClick={this.subscribeUser}>Update</button> </> :
                      <p>Start exploring a place to enable notifications</p>
                    }
                        </div>
                     </Modal>
                        <li class="list-inline-item"><a className="btn btn-error" onClick={this.logout}>Logout</a></li>
                      </ul>
                      </Form>




                    </div>
                  </nav>
                  <ToastsContainer store={ToastsStore}/>
            </div>
          );
      }
      else{
      return (
            <div>
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
                    <div className="container-fluid">
                      <a className="navbar-brand" href="/home">City Scanner</a>
                      <Form>

                      <a className="btn btn-error" onClick={this.changeState} show={this.state.isLogin}>Login</a>
                       <Modal style={{zIndex:50000}} show={this.state.showModal1} onHide={this.changeState}>
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
                      <a className="btn btn-error" onClick={this.changeState2} show={this.state.isLogin}>Sign Up</a>
                  <Modal style={{zIndex:50000}} show={this.state.showModal2} onHide={this.changeState2}>
                    <Form style = {{padding:'20px'}}>
                          <Form.Group controlId="Header">
                              <h1 style={{textAlign:"center"}}>Sign Up</h1>
                          </Form.Group>
                        <Form.Row>
                          <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label style={{fontSize:18}}>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"  value={this.state.newEmail}  name="newEmail" onChange={this.onChange} />
                          </Form.Group>

                          <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label style={{fontSize:18}}>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={this.state.newPassword} name="newPassword"  onChange={this.onChange} />
                          </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formGridFirstName">
                          <Form.Label style={{fontSize:18}}>First Name</Form.Label>
                          <Form.Control placeholder="" value={this.state.newFirstName} name="newFirstName" onChange={this.onChange} />
                        </Form.Group>

                        <Form.Group controlId="formGridLastName">
                          <Form.Label style={{fontSize:18}}>Last Name</Form.Label>
                          <Form.Control placeholder="" value={this.state.newLastName} name="newLastName" onChange={this.onChange} />
                        </Form.Group>

                        <Form.Row>
                          <Form.Group as={Col} controlId="formGridContact">
                            <Form.Label style={{fontSize:18}}>Contact</Form.Label>
                            <Form.Control  value={this.state.newContact} name="newContact"  onChange={this.onChange} />
                          </Form.Group>

                        </Form.Row>

                        <Button style = {{float:'right'}} variant="primary" type="Button" onClick={this.createNewUser}>
                          Sign Up
                        </Button>
                      </Form>
                    </Modal>

                      </Form>
                    </div>
                  </nav>
                  <ToastsContainer store={ToastsStore}/>
            </div>
          );
        }
        }
  }

  export default Header
