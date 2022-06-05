import React, { Component } from 'react';
import { connect } from "react-redux";
import { initMedia } from '../webrtc/webrtc';

import {
    CALL_STATE_DISCONNECTED,
    CALL_STATE_CONNECTED
} from '../call';

import '../../css/ViewLocal.css';

type Props = {
  progressCall: CALL_STATE_DISCONNECTED,
  classes: Object,
};

class ViewLocal extends Component {

  constructor(props: Props) {
    super(props);

    this._getStyle = this._getStyle.bind(this);
  }

    _getStyle() {
        const { progressCall = CALL_STATE_DISCONNECTED } = this.props;
        let res = 'video-container-maximized';
        switch (progressCall) {
            case CALL_STATE_CONNECTED:
                res = "video-container-small ";
                break;
            default:
                break;
        }
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
                muted = { true }
                playsInline={true} /* for Safari on iOS to work */ />
        </div>
        );
    }
}




const mapStateToProps = state => {
    const { progress: progressCall = CALL_STATE_DISCONNECTED } = state?.call;
    return {
        progressCall
    };
};

export default connect(mapStateToProps)(ViewLocal);
