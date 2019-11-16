import React, { Component } from "react";
import CitiesSlider from "./CitiesSlider";
import Flip from "./Flip";
import Homebody from './Homebody'

export default class HomeComponent extends Component {
  render() {
    return (
      <React.Fragment>
        <CitiesSlider />
        <Homebody/>
      </React.Fragment>
    );
  }
}
