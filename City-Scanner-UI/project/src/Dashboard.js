import React, { Component } from "react";
import { Link } from "react-router-dom";

class Dashboard extends Component {

   constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props.location;

    return (
      <>
        <h1>{data}</h1>
                     <Link
                  to={{ pathname: "/Restaurants", data: data }}
                >
                Food
                </Link>
      </>
    );
  }
}

export default Dashboard;
