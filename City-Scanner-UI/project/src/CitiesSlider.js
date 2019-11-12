import React, {Component} from 'react';
import { Fade } from 'react-slideshow-image';

const fadeProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  onChange: (oldIndex, newIndex) => {
    console.log(`fade transition from ${oldIndex} to ${newIndex}`);
  }
}
 
class CitiesSlider extends Component {

  render() {
      return (
        <div className="slide-container">
          <Fade {...fadeProperties}>
            <div className="each-fade">
              <div className="image-container">
                <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/singapore.jpg' height="500" width="1550"/>
              </div>
            </div>
            <div className="each-fade">
              <div className="image-container">
                <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/prague.jpg' height="500" width="1550"/>
              </div>
            </div>
            <div className="each-fade">
              <div className="image-container">
                <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/paris.jpg' height="500" width="1550"/>
              </div>
            </div>
            <div className="each-fade">
              <div className="image-container">
                <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/amsterdam.jpg' height="500" width="1550"/>
              </div>
            </div>
            <div className="each-fade">
              <div className="image-container">
                <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/moscow.jpg' height="500" width="1550"/>
              </div>
            </div>
          </Fade>
        </div>
      )
    }
  }

export default CitiesSlider
