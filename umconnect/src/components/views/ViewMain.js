import React, { Component } from 'react';
import { DialogCallConfirm } from '../dialogs/DialogCallConfirm'
import ViewLocal from './ViewLocal'
import ViewRemote from './ViewRemote'
import { call, incomingCall, reject, hungup } from '../call'
import {
  CALL_STATE_DISCONNECTED,
  CALL_STATE_CONNECTING,
  CALL_STATE_CONFIRMING,
  CALL_STATE_CONNECTED
} from '../call';

import { connect } from "react-redux";
import { connectPeerServer } from '../peer-server/actions';
import { fetchNewTime } from "../redux/actionCreators";
import { getUrlPeerServer } from '../config'
import { VERSION } from '../version';
import '../../css/ViewMain.css';
import '../../css/TextInput.css';
import '../../css/Buttons.css';

type Props = {
  callData: {},
  progressCall: CALL_STATE_DISCONNECTED,
  progressPeer: 0,
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
  dispatchHungup: (hungup) => hungup(dispatch)
});


class ViewMain extends Component {

  constructor(props: Props) {
    super(props);
    this.state = {
      localName: '',
      remoteName: '',
      urlServer: getUrlPeerServer()
    };
    this._onConnectPeerServer = this._onConnectPeerServer.bind(this);
    this._onCall = this._onCall.bind(this);
    this._onConfirm = this._onConfirm.bind(this);
    this._onReject = this._onReject.bind(this);
    this._onHungup = this._onHungup.bind(this);
    this._debugInfo = this._debugInfo.bind(this);
    this._onChangeLocalName = this._onChangeLocalName.bind(this);
    this._onChangeRemoteName = this._onChangeRemoteName.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._renderControlsConnectPeer = this._renderControlsConnectPeer.bind(this);
    this._renderControlsCall = this._renderControlsCall.bind(this);
    this._renderInputButton = this._renderInputButton.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { progressCall = CALL_STATE_DISCONNECTED } = this.props;

    if (progressCall === CALL_STATE_CONFIRMING) {
      const { callData = {} } = this.props;
      const { from = 'неизвестный пользователь' } = callData;
      this.state.remoteName = from;

      DialogCallConfirm(from, this._onConfirm, this._onReject);
    }
  }

  _onConnectPeerServer() {
    const { dispatchConnectPeerServer } = this.props;
    dispatchConnectPeerServer(this.state.urlServer, this.state.localName);
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

  _onHungup() {
    const { dispatchHungup } = this.props;
    dispatchHungup();
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
    this.setState({ localName: event.target.value });
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
        dispatchConnectPeerServer(this.state.urlServer, this.state.localName);
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
    const { progressPeer = 0 } = this.props;

    return (
      <>
        {
          <input type="text" className='text-input' disabled={progressPeer === 3} onChange={this._onChangeLocalName} placeholder="Введите свое имя" />
        }
      </>
    );
  }

  _renderControlsCall() {
    const { progressCall = CALL_STATE_DISCONNECTED, progressPeer = 0 } = this.props;
    const disabled_ = progressPeer !== 3 && progressCall === CALL_STATE_DISCONNECTED;
    const placeholderText_ = disabled_ ? null : "Введите имя собеседника";

    return (
      <>
        {
          <input type="text" className='text-input' disabled={disabled_} onChange={this._onChangeRemoteName} placeholder={placeholderText_} />
        }
      </>
    );
  }

  _renderInputButton() {
    const { progressCall = CALL_STATE_DISCONNECTED, progressPeer = 0 } = this.props;
    let className_ = "button-base";
    let disabled_ = true;

    switch (progressPeer) {
      case 0:
        disabled_ = !this.state.localName;
        break;
      case 1:
      case 2:
        break;
      case 3:
        switch (progressCall) {
          case CALL_STATE_DISCONNECTED:
            disabled_ = !this.state.remoteName;
            break;
          case CALL_STATE_CONNECTED:
            className_ += " button-nodisplay"
            break;
          default:
            break;
        }
        break;
    }

    return (
      <>
        {
          <input type="submit" value="OK" className={className_} disabled={disabled_}/>
        }
      </>
    );
  }
  

  // https://www.npmjs.com/package/react-confirm-alert
  render() {

    return (
      <div id="ViewMain" className="inner-container">
        <ViewRemote />
        <ViewLocal />
        <div className="inputs">
          <form onSubmit={this._handleSubmit} noValidate>
            {this._renderControlsConnectPeer()}
            <p />
            {this._renderControlsCall()}
            <p />
            {this._renderInputButton()}
          </form>
        </div>
        <div className="dbg-info">
          {this._debugInfo()}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewMain);