import React, { Component } from 'react';
import { connect } from "react-redux";

import '../../css/ViewRemote.css';

type Props = {
  classes: Object
};

class ViewRemote extends Component {

  constructor(props: Props) {
    super(props);
  }

    async componentDidMount() {
    }

    render() {
        return (<div className='video-remote-container-maximized' >
            <video
                id='videoRemote'
                className="video-maximized"
                autoPlay={true}
                playsInline={true} /* for Safari on iOS to work */ />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

export default connect(mapStateToProps)(ViewRemote);
