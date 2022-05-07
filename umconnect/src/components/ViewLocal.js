import React, { Component } from 'react';

import '../css/ViewLocal.css';

class ViewLocal extends Component {

  render() {
    return (
      <div id="ViewLocal" className="maximized-container">
        <video id="videoLocal" className="video-local" playsInline muted></video>
      </div>
    );
  }
}

export default ViewLocal;