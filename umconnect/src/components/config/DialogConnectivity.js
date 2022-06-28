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
import { fetchNewTime } from "../redux/actionCreators";
import { VERSION } from '../version';

import { saveUser, loadUser } from '../profile/user';
import { getUrlPeerServer } from '../profile/connectivity';


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
  updateTime: () => dispatch(fetchNewTime()),
  dispatchConnectPeerServer: (urlServer, localName) => connectPeerServer(dispatch, urlServer, localName),
  dispatchCall: (remoteName) => call(dispatch, remoteName),
  dispatchIncomingCall: (callData) => incomingCall(dispatch, callData),
  dispatchReject: (remoteName) => reject(dispatch, remoteName),
  dispatchHangup: () => hangup(dispatch)
});

function qqq () {
  alert('qqq2222222222222222');
}

class DailogConnectivity extends Component {

  constructor(props: Props) {
    super(props);
    this._onSubmit = this._onSubmit.bind(this);
    this._drawContent = this._drawContent.bind(this);

    this.state = {
      user: loadUser(),
      remoteName: '',
      urlServer: getUrlPeerServer()
    };
    this._onConnectPeerServer = this._onConnectPeerServer.bind(this);
    this._onCall = this._onCall.bind(this);
    this._onConfirm = this._onConfirm.bind(this);
    this._onReject = this._onReject.bind(this);
    this._onHangup = this._onHangup.bind(this);
    this._debugInfo = this._debugInfo.bind(this);
    this._onChangeLocalName = this._onChangeLocalName.bind(this);
    this._onChangeRemoteName = this._onChangeRemoteName.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._renderControlsConnectPeer = this._renderControlsConnectPeer.bind(this);
    this._renderControlsCall = this._renderControlsCall.bind(this);
  }

  componentDidUpdate(prevProps) {

  }

  _onConnectPeerServer() {
    const { dispatchConnectPeerServer } = this.props;
    dispatchConnectPeerServer(this.state.urlServer, this.state.user.name());
  }

  _onCall() {
    const { dispatchCall } = this.props;
    dispatchCall(this.state.remoteName);
  }

  _onConfirm() {
    const { callData, dispatchIncomingCall } = this.props;
    dispatchIncomingCall(callData);
  }

  _onReject() {
    const { dispatchReject } = this.props;
    dispatchReject(this.state.remoteName);
  }

  _onHangup() {
    const { dispatchHangup } = this.props;
    dispatchHangup();
  }

  _debugPeerServer() {
    const { progressPeer = 0 } = this.props;
    let strProgressPeer = "отключен";
    switch (progressPeer) {
      case 0:
        break;
      case 1:
        strProgressPeer = "подключение ...";
        break;
      case 2:
        strProgressPeer = "регистрация ...";
        break;
      case 3:
        strProgressPeer = "подключен";

    }
    return `Сервер: ${this.state.urlServer} : ${strProgressPeer}`;
  }

  _debugInfoCall() {
    const { progressCall = CALL_STATE_DISCONNECTED } = this.props;
    let res = "Чат: отключен";
    switch (progressCall) {
      case CALL_STATE_CONNECTING:
        res = "Чат: подключение...";
        break;
      case CALL_STATE_CONNECTED:
        res = "Чат: подключен";
        break;
      default:
        break;
    }
    return res;
  }

  _debugInfo() {
    return `Версия: ${VERSION} ${this._debugPeerServer()} ${this._debugInfoCall()}`;
  }

  _onChangeLocalName(event) {
    let { user } = this.state;
    user.props.name = event.target.value;

    saveUser(user);
    this.setState({ user });
  }

  _onChangeRemoteName(event) {
    this.setState({ remoteName: event.target.value });
  }

  _handleSubmit = (event) => {
    event.preventDefault();
    const {
      dispatchCall,
      dispatchConnectPeerServer,
      progressCall,
      progressPeer
    } = this.props;
    
    switch (progressPeer) {
      case 0:
        dispatchConnectPeerServer(this.state.urlServer, this.state.user.name());
        break;
      case 1:
      case 2:
        break;
      case 3:
        switch (progressCall) {
          case CALL_STATE_DISCONNECTED:
            dispatchCall(this.state.remoteName);
            break;
          default:
            break;
        }
        break;
    }
  }

  _renderControlsConnectPeer() {
    const { progressCall = CALL_STATE_DISCONNECTED, progressPeer = 0 } = this.props;
    const show = progressCall === CALL_STATE_CONNECTED ? false : true;
    const { user } = this.state;
    const localName = user ? this.state.user.name() : '';
    return (
      <>
        {
          show 
            ? < input type="text" 
                className='text-input'
                disabled={progressPeer === 3} 
                onChange={this._onChangeLocalName} 
                placeholder="Введите свое имя" 
                value={localName}/> 
            : null
        }
      </>
    );
  }

  _renderControlsCall() {
    const { progressCall = CALL_STATE_DISCONNECTED, progressPeer = 0 } = this.props;
    const disabled_ = progressPeer !== 3 && progressCall === CALL_STATE_DISCONNECTED;
    const placeholderText_ = disabled_ ? null : "Введите имя собеседника";
    const show = progressCall === CALL_STATE_CONNECTED ? false : true;

    return (
      <>
        {
          show ? <input type="text" className='text-input' disabled={disabled_} onChange={this._onChangeRemoteName} placeholder={placeholderText_} /> : null
        }
      </>
    );
  }

  
  _onSubmit() {
   qqq();
  }

  _drawContent() {
    return <>
        {'afedasdfasdfasdfadsfasdf'}
    </>
  }

  render() {

    return (
      <DialogBase content={this._drawContent()} onSubmit={this._onSubmit}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DailogConnectivity);

