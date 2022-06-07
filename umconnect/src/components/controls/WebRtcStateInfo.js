import React, { Component } from 'react';
import { connect } from "react-redux";

import '../../css/WebRtcStateInfo.css';

type Props = {
    connectionState: null,
    iceConnectionState: null,
    iceGatheringState: null,
    signalingState: null,
    classes: Object,
};

class WebRtcStateInfo extends Component {

    constructor(props: Props) {
        super(props);
    }

    render() {
        const {
            connectionState,
            iceConnectionState,
            iceGatheringState,
            signalingState
        } = this.props;

        return (
            <div id="WebRtcStateInfo" className='webrtc-state-info' >
                { `Connection state: ${connectionState} `}
                <br/>
                { `ICE connection state: ${iceConnectionState}`}
                <br/>
                { `ICE gathering state: ${iceGatheringState}`}
                <br/>
                { `Signaling state: ${signalingState} `}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {
        connectionState,
        iceConnectionState,
        iceGatheringState,
        signalingState
    } = state?.webrtc;

    return {
        connectionState,
        iceConnectionState,
        iceGatheringState,
        signalingState
    };
};

export default connect(mapStateToProps)(WebRtcStateInfo);
