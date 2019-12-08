import React, { Component } from "react";
import { ReactTypeformEmbed } from '@typeform/embed';
import * as typeformEmbed from '@typeform/embed'
class ShareForm extends React.Component {
    constructor(props) {
      super(props);
      this.el = null;
    }
    componentDidMount() {
      if (this.el) {
        typeformEmbed.makeWidget(this.el, "https://manujasanjaybandal.typeform.com/to/zTjU9y", {
          hideFooter: true,
          hideHeaders: true,
          opacity: 0
        });
      }
    }
    render() {
      return (
        <div ref={(el) => this.el = el} style={{width: '100%', height: '300px'}} />
      )
    }
  }
  
  export default ShareForm;