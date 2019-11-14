import React, { Component } from "react";
class Dashboard extends Component {
  componentDidMount() {
    console.log(this.props.location);
  }
  render() {
    const { data } = this.props.location;

    return (
      <>
        <h1>{data}</h1>
      </>
    );
  }
}

export default Dashboard;
