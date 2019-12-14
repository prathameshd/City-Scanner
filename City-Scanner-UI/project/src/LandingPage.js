import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MDBCol, MDBBtn } from "mdbreact";
import Header from "./Header";
import ls from "local-storage";
import ReactTypingEffect from 'react-typing-effect';
import  "./App"


export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
      location: ""
    };
    this._onButtonClick = this._onButtonClick.bind(this);
  }

  _onButtonClick = id => {
    this.setState({ [id]: true });
  };

  handleChange = event => {
    this.setState({ location: event.target.value });
    ls.set("city", event.target.value);
  };

  componentDidMount() {

        ls.remove("city");

    console.log(ls);
  }
  render() {
    return (
      <>
        <div id="style-1" style={{ overflowY:'scroll'}} >
          <header className="masthead text-white text-center" >
            <div className="overlay" />
            <div className="container-fluid">
            <div className="row">
                           <div className="col-xl-8 mx-auto" style={{paddingRight:"180px"}}>
        <h1><ReactTypingEffect
                      text={[
                        "Finalized a university?",
                        "Moving to a new city?",
                        "You are at the Right Place!  "
                      ]}
                      speed="55"
                      eraseDelay="1500"
                      
                    /></h1>
                </div>
                </div>
              <div className="row">
 
                <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
                  <form>
                    <div className="form-row">
                      <div className="input-group md-form form-sm form-1 pl-0">
                        <div className="col-12 col-md-9 mb-2 mb-md-0">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter destination"
                            name="location"
                            value={this.state.location}
                            onChange={this.handleChange}
                            style={{borderRadius:'9px'}}
                          />
                        </div>
                        <div className="input-group-prepend" style={{backgroundColor:'#0277bd',borderRadius:"7px"}}>
                          <Link to={{ pathname: "/Dashboard" }}>
                            <div className="col-12 col-md-15">
                              <button
                                type="submit"
                                className="btn btn-lg"

                              >
                                <a style={{color:'white'}}>Search</a>
                              </button>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </header>
          <section className="features-icons bg-light text-center">
            <div className="container">
              <div className="row">
                <div className="col-lg-4">
                  <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                    <div className="features-icons-icon d-flex">
                      <i className="icon-screen-desktop m-auto text-primary" />
                    </div>
                    <h3>Explore</h3>
                    <p className="lead mb-0">
                      Get to know about the city you are travelling to!
                    </p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                    <div className="features-icons-icon d-flex">
                      <i className="icon-layers m-auto text-primary" />
                    </div>
                    <h3>Connect</h3>
                    <p className="lead mb-0">
                      Find the reviews from the local residents and students of the city.
                    </p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                    <div className="features-icons-icon d-flex">
                      <i className="icon-check m-auto text-primary" />
                    </div>
                    <h3>Get notified</h3>
                    <p className="lead mb-0">
                    Sign up to get personalized notifications and never miss on any updates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="showcase">
            <div className="container-fluid p-0">
              <div className="row no-gutters">
                <div
                  className="col-lg-6 order-lg-2 text-white showcase-img"
                  style={{ backgroundImage: 'url("img/bg-showcase-1.jpg")' }}
                />
                <div className="col-lg-6 order-lg-1 my-auto showcase-text">
                  <h2>Housing</h2>
                  <p className="lead mb-0">
                    As soon as the university is finalized, the most important task is to find housing.
                    We help you to find perfect apartments based on distanace from campus and bus stops and other preferred amenities.
                  </p>
                </div>
              </div>
              <div className="row no-gutters">
                <div
                  className="col-lg-6 text-white showcase-img"
                  style={{ backgroundImage: 'url("img/bg-showcase-2.jpg")' }}
                />
                <div className="col-lg-6 my-auto showcase-text">
                  <h2>Restaurants</h2>
                  <p className="lead mb-0">
                    Love Mexican, Indian, Chineese or Italian food? 
                    Get to know about all food places within the city and enjoy eating your favorite cuisine.
                  </p>
                </div>
              </div>
              <div className="row no-gutters">
                <div
                  className="col-lg-6 order-lg-2 text-white showcase-img"
                  style={{ backgroundImage: 'url("img/bg-showcase-3.jpg")' }}
                />
                <div className="col-lg-6 order-lg-1 my-auto showcase-text">
                  <h2>Places to Visit</h2>
                  <p className="lead mb-0">
                    Having free time before the start of semester?
                    Or tried of hectic student life, take a break from your busy schedule and chill along with your friends.
                    Explore beautiful and adventurous destinations in and around the city.
                  </p>
                </div>
              </div>
              <div className="row no-gutters">
                <div
                  className="col-lg-6 text-white showcase-img"
                  style={{ backgroundImage: 'url("img/bg-showcase-4.jpg")' }}
                />
                <div className="col-lg-6 my-auto showcase-text">
                  <h2>Events</h2>
                  <p className="lead mb-0">
                    Don't miss a chance to socialize and do exciting activities. Discover what's happening around you.
                    Find events near you or publicize an event that you want to host.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section>
          <footer className="footer bg-light" style={{ position: "relative", paddingBottom:"50px" }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-6 h-100 text-center text-lg-left my-auto">
                  <ul className="list-inline mb-2">
                    <li className="list-inline-item">
                      <a href="#">About</a>
                    </li>
                    <li className="list-inline-item">⋅</li>
                    <li className="list-inline-item">
                      <a href="#">Contact</a>
                    </li>
                    <li className="list-inline-item">⋅</li>
                    <li className="list-inline-item">
                      <a href="#">Terms of Use</a>
                    </li>
                    <li className="list-inline-item">⋅</li>
                    <li className="list-inline-item">
                      <a href="#">Privacy Policy</a>
                    </li>
                  </ul>
                  <p className="text-muted small mb-4 mb-lg-0">
                    © City Scanner 2019. All Rights Reserved.
                  </p>
                </div>
                <div className="col-lg-6 h-100 text-center text-lg-right my-auto">
                  <ul className="list-inline mb-0">
                    <li className="list-inline-item mr-3">
                      <a href="#">
                        <i className="fab fa-facebook fa-2x fa-fw" />
                      </a>
                    </li>
                    <li className="list-inline-item mr-3">
                      <a href="#">
                        <i className="fab fa-twitter-square fa-2x fa-fw" />
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">
                        <i className="fab fa-instagram fa-2x fa-fw" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
          </section>
          </div>
      </>
    );
  }
}
