import React, { Component } from 'react';
import { connect } from "react-redux";
import { initMedia } from './webrtc/webrtc';

import '../css/ViewLocal.css';

type Props = {
  progressCall: 0,
  classes: Object,
};

class ViewLocal extends Component {

  constructor(props: Props) {
    super(props);

    this._getStyle = this._getStyle.bind(this);
  }

    _getStyle() {
        const { progressCall = 0 } = this.props;
        let res = 'video-container-maximized';
        switch (progressCall) {
            case 0:
            case 1:
                break;
            case 2:
                res = "video-container-small ";
                break;
        }
        //res = "video-container-small ";
        return res;
    }

    async componentDidMount() {
        await initMedia();
    }

    render() {
        return (<div id="ViewLocal" className={this._getStyle()} >
            <video
                id='videoLocal'
                className="video-maximized"
                autoPlay={true}
                playsInline={true} /* for Safari on iOS to work */ />
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

export default connect(mapStateToProps)(ViewLocal);
