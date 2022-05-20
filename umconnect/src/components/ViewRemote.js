import React, { Component } from 'react';
import { connect } from "react-redux";

import '../css/ViewRemote.css';

type Props = {
  progressCall: 0,
  classes: Object,
};

class ViewRemote extends Component {

  constructor(props: Props) {
    super(props);
  }

    async componentDidMount() {
    }

    render() {
        return (<div className='video-remote-container-maximized' >
            <video id="videoRemote" className="video-maximized" playsInline autoPlay muted > </video> 
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { progress: progressCall = 0 } = state?.call;
    return {
        progressCall
    };
};

export default connect(mapStateToProps)(ViewRemote);
