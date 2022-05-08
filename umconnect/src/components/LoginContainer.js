import React, { Component } from 'react';
import ViewLocal from './ViewLocal'

import '../css/ViewMain.css';

class LoginContainer extends Component {

  render() {
    return (
      <div id="LoginContainer" className="inner-container">
        <ViewLocal/>
        <button className="button-connect">Connect</button>
      </div>
    );
  }
}

export default LoginContainer;
