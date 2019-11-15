import React, { Component } from "react";
import ExampleComponent from "react-rounded-image";


class Homebody extends Component {
    render() {
      return (
        <>
        <div style={{marginBottom: 200, marginTop: 100}}>
        <div style={{marginLeft: 20, width:500, height:100}}>
          <ExampleComponent
            image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/prague.jpg"
            roundedColor="#321124"
            imageWidth="300"
            imageHeight="300"
            roundedSize="10"
          />
        </div>
        <div style={{marginLeft:350}}>
        {/* <div class="box"><i class="fas fa-quote-left fa2"></i>
            <div class="text"><i class="fas fa-quote-right fa1"></i>
                <div>
                    <h3>Quote the day</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
                        book.</p>
                </div>
            </div>
        </div> */}
          <blockquote className="blockquote text-center" >
                    <p className="mb-0">
                    A city is a large human settlement.[4][5] It can be defined as a permanent and densely settled place with administratively defined boundaries whose members work primarily on non-agricultural tasks.[6] Cities generally have extensive systems for housing, transportation, sanitation, utilities, land use, and communication. Their density facilitates interaction between people, government organisations and businesses, sometimes benefiting different parties in the process..
                    </p>
                    <footer className="blockquote-footer">
                        Someone famous in <cite title="Source Title">Source Title</cite>
                    </footer>
        </blockquote>
        </div>
        </div>

<div style={{marginBottom: 200}}>
<div style={{marginLeft: 1200, width:500, height:100}}>
<ExampleComponent
  image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/prague.jpg"
  roundedColor="#321124"
  imageWidth="300"
  imageHeight="300"
  roundedSize="15"
  align="middle"
/>
</div>
<div style={{marginRight:350}}>
<blockquote className="blockquote text-center" >
                    <p className="mb-0">
                    A city is a large human settlement.[4][5] It can be defined as a permanent and densely settled place with administratively defined boundaries whose members work primarily on non-agricultural tasks.[6] Cities generally have extensive systems for housing, transportation, sanitation, utilities, land use, and communication. Their density facilitates interaction between people, government organisations and businesses, sometimes benefiting different parties in the process..
                    </p>
                    <footer className="blockquote-footer">
                        Someone famous in <cite title="Source Title">Source Title</cite>
                    </footer>
        </blockquote>
</div>
</div>

<div style={{marginBottom: 200}}>
<div style={{marginLeft: 20, width:500, height:100}}>
          <ExampleComponent
            image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/prague.jpg"
            roundedColor="#321124"
            imageWidth="300"
            imageHeight="300"
            roundedSize="15"
            align="middle"
          />
        </div>
        <div style={{marginLeft:350}}>
        <blockquote className="blockquote text-center" >
                    <p className="mb-0">
                    A city is a large human settlement.[4][5] It can be defined as a permanent and densely settled place with administratively defined boundaries whose members work primarily on non-agricultural tasks.[6] Cities generally have extensive systems for housing, transportation, sanitation, utilities, land use, and communication. Their density facilitates interaction between people, government organisations and businesses, sometimes benefiting different parties in the process.
                    </p>
                    <footer className="blockquote-footer">
                        Someone famous in <cite title="Source Title">Source Title</cite>
                    </footer>
        </blockquote>
        </div>
        </div>

<div style={{marginBottom: 100}}>
<div style={{marginLeft: 1200, width:500, height:100}}>
<ExampleComponent
  image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/prague.jpg"
  roundedColor="#321124"
  imageWidth="300"
  imageHeight="300"
  roundedSize="15"
  align="middle"
/>
</div>
<div style={{marginRight:350}}>
<blockquote className="blockquote text-center" >
                    <p className="mb-0">
                    A city is a large human settlement.[4][5] It can be defined as a permanent and densely settled place with administratively defined boundaries whose members work primarily on non-agricultural tasks.[6] Cities generally have extensive systems for housing, transportation, sanitation, utilities, land use, and communication. Their density facilitates interaction between people, government organisations and businesses, sometimes benefiting different parties in the process.
                    </p>
                    <footer className="blockquote-footer">
                        Someone famous in <cite title="Source Title">Source Title</cite>
                    </footer>
        </blockquote>
</div>
</div>
</>
      );
    }
  }

  export default Homebody;
