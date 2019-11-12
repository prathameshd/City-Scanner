import React, { Component } from "react";
import { HashRouter as Router, Route, Link, NavLink } from "react-router-dom";
import { MDBCol, MDBIcon, MDBBtn } from "mdbreact";
import Dashboard from "./Components/Dashboard";
import CitiesSlider from "./CitiesSlider";

export default class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false
    };
    this._onButtonClick = this._onButtonClick.bind(this);
    this.state = { location: "" };
  }

  _onButtonClick = id => {
    this.setState({ [id]: true });
  };

  handleChange = event => {
    this.setState({ location: event.target.value });
  };

  handleClick(data) {
    console.log(data);
  }

  render() {
    return (
      <Router>
      <CitiesSlider/>
        <React.Fragment>
          <div className="search-bar">
            <MDBCol md="6">
              <div className="input-group md-form form-sm form-1 pl-0">
                <input
                  className="form-control my-0 py-1"
                  type="text"
                  placeholder="Enter a location"
                  aria-label="Search"
                  name="location"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                        <Link className="nav-link" to="/temp">temp</Link>
                <div className="input-group-prepend">
                  <NavLink to="/Dashboard">
                    <MDBBtn
                      id="button1"
                      onClick={() => this._onButtonClick("button1")}
                      rounded
                      size="md"
                      color="info"
                    >
                      Search
                      <MDBIcon icon="heart" className="ml-2" />
                    </MDBBtn>
                  </NavLink>
                </div>
              </div>
            </MDBCol>

          </div>
          <h3>{this.state.location}</h3>
        </React.Fragment>
      </Router>
    );
  }
}
