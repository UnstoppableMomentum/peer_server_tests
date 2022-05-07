import React, { Component } from 'react';
import { initMedia } from './webrtc/media';

import '../css/ViewLocal.css';

class ViewLocal extends Component {

  async componentDidMount() {
    await initMedia();
  }

  render() {
    return (
      <div id="ViewLocal" className="maximized-container">
        <video id="videoLocal" className="video-local" playsinline autoPlay muted></video>
      </div>
    );
  }
}

export default ViewLocal;