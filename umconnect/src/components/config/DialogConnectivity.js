import React, { Component } from 'react';
import DialogBase from '../dialogs/DialogBase';

import { call, incomingCall, reject, hangup } from '../call'
import {
  CALL_STATE_DISCONNECTED,
  CALL_STATE_CONNECTING,
  CALL_STATE_CONNECTED
} from '../call';

import { connect } from "react-redux";
import { connectPeerServer } from '../peer-server/actions';
import { saveConnectivity, loadConnectivity } from '../profile/connectivity';


import '../../css/ViewMain.css';
import '../../css/TextInput.css';
import '../../css/Buttons.css';
import '../../css/Dialogs.css';


type Props = {
  callData: {},
  progressCall: CALL_STATE_DISCONNECTED,
  progressPeer: 0,
  onSubmit: Function,
  drawContent: Function,
  classes: Object,
};

const mapStateToProps = state => {
  const { progress: progressCall = CALL_STATE_DISCONNECTED, data: callData = {} } = state?.call;
  const { progress: progressPeer = 0 } = state?.peerConnection;
  return {
    callData,
    currentTime: state.currentTime.currentTime,
    progressCall,
    progressPeer
  };
};

const mapDispatchToProps = dispatch => ({
  dispatchConnectPeerServer: (urlServer, localName) => connectPeerServer(dispatch, urlServer, localName),
  dispatchCall: (remoteName) => call(dispatch, remoteName),
  dispatchIncomingCall: (callData) => incomingCall(dispatch, callData),
  dispatchReject: (remoteName) => reject(dispatch, remoteName),
  dispatchHangup: () => hangup(dispatch)
});

function qqq() {
  alert('qqq2222222222222222');
}

class DailogConnectivity extends Component {

  constructor(props: Props) {
    super(props);
    const { props: propsConnectivity } = loadConnectivity();

    this.state = {
      server: propsConnectivity.server ? propsConnectivity.server : ''
    }

    this._onSubmit = this._onSubmit.bind(this);
    this._drawContent = this._drawContent.bind(this);
    this._onChangeServerName = this._onChangeServerName.bind(this);
  }

  _onChangeServerName(event) {
    this.setState({ server: event.target.value });
  }

  _onSubmit() {
    saveConnectivity({props: this.state});
  }

  _drawContent() {
    const {server} = this.state;
    return <>
      {'URL Сервера'}
      {<input
        type="text"
        className='text-input'
        onChange={this._onChangeServerName}
        value={server} 
        placeholder={'wss://server:port'} />
      }
    </>
  }

  render() {

    return (
      <DialogBase content={this._drawContent()} onSubmit={this._onSubmit} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DailogConnectivity);


