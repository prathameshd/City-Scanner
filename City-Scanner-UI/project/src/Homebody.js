import React, { Component } from "react";
import ExampleComponent from "react-rounded-image";


class Homebody extends Component {
    render() {
      return (
        <>
        <div className="container-fluid" style={{textAlign:'center',marginTop:50,backgroundColor:'#008B8B',height:200}}>
        <h2 style={{top:80,position:'relative'}}>Explore CityScanner</h2>
        </div>
        <div className="container-fluid">
        <div className="row">
        <div className="col-sm-3">
          <ExampleComponent
            image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/prague.jpg"
            roundedColor="#321124"
            imageWidth="300"
            imageHeight="300"
            roundedSize="10"
          />
        </div>
        <div className="col-sm-9" style={{top:85}}>
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
        </div>

  <div className="container-fluid">
        <div className="row">
                <div className="col-sm-9" style={{top:85}}>
<blockquote className="blockquote text-center" >
                    <p className="mb-0">
                    A city is a large human settlement.[4][5] It can be defined as a permanent and densely settled place with administratively defined boundaries whose members work primarily on non-agricultural tasks.[6] Cities generally have extensive systems for housing, transportation, sanitation, utilities, land use, and communication. Their density facilitates interaction between people, government organisations and businesses, sometimes benefiting different parties in the process..
                    </p>
                    <footer className="blockquote-footer">
                        Someone famous in <cite title="Source Title">Source Title</cite>
                    </footer>
        </blockquote>
    </div>
        <div className="col-sm-3">
<ExampleComponent
  image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/prague.jpg"
  roundedColor="#321124"
  imageWidth="300"
  imageHeight="300"
  roundedSize="15"
  align="middle"
/>
</div>
        </div>
        </div>

<div className="container-fluid">
        <div className="row">
        <div className="col-sm-3">
          <ExampleComponent
            image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/prague.jpg"
            roundedColor="#321124"
            imageWidth="300"
            imageHeight="300"
            roundedSize="10"
          />
        </div>
        <div className="col-sm-9" style={{top:85}}>
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
        </div>

  <div className="container-fluid">
        <div className="row">
                <div className="col-sm-9" style={{top:85}}>
<blockquote className="blockquote text-center" >
                    <p className="mb-0">
                    A city is a large human settlement.[4][5] It can be defined as a permanent and densely settled place with administratively defined boundaries whose members work primarily on non-agricultural tasks.[6] Cities generally have extensive systems for housing, transportation, sanitation, utilities, land use, and communication. Their density facilitates interaction between people, government organisations and businesses, sometimes benefiting different parties in the process..
                    </p>
                    <footer className="blockquote-footer">
                        Someone famous in <cite title="Source Title">Source Title</cite>
                    </footer>
        </blockquote>
    </div>
        <div className="col-sm-3">
<ExampleComponent
  image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/prague.jpg"
  roundedColor="#321124"
  imageWidth="300"
  imageHeight="300"
  roundedSize="15"
  align="middle"
/>
</div>
        </div>
        </div>
</>
      );
    }
  }

  export default Homebody;
