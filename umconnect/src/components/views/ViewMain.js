import React, { Component } from 'react';
import ViewLocal from './ViewLocal'
import ViewRemote from './ViewRemote'
import { call, hungup } from '../call/actions'
import { connect } from "react-redux";
import { connectPeerServer } from '../peer-server/actions';
import { fetchNewTime } from "../redux/actionCreators";
import { VERSION } from '../version';
import { getUrlPeerServer } from '../config'
import '../../css/ViewMain.css';

type Props = {
  progressCall: 0,
  progressPeer: 0,
  classes: Object,
};

const mapStateToProps = state => {
  const { progress : progressCall = 0} = state?.call;
  const { progress : progressPeer = 0} = state?.peerConnection;
  return {
    currentTime: state.currentTime.currentTime,
    progressCall,
    progressPeer
  };
};

const mapDispatchToProps = dispatch => ({
  updateTime: () => dispatch(fetchNewTime()),
  dispatchConnectPeerServer : (urlServer, localName) => connectPeerServer(dispatch, urlServer, localName),
  dispatchCall : (remoteName) => call(dispatch, remoteName),
  dispatchHungup : (hungup) => hungup(dispatch)
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
    this._onHungup = this._onHungup.bind(this);
    this._debugInfo = this._debugInfo.bind(this);
    this._onChangeLocalName = this._onChangeLocalName.bind(this);
    this._onChangeRemoteName = this._onChangeRemoteName.bind(this);
  }

  _onConnectPeerServer() {
    const { dispatchConnectPeerServer } = this.props;
    dispatchConnectPeerServer(this.state.urlServer, this.state.localName);
  }

  _onCall() {
    const { dispatchCall } = this.props;
    dispatchCall(this.state.remoteName);
  }

  _onHungup() {
    const { dispatchHungup } = this.props;
    dispatchHungup();
  }

  _debugPeerServer() {
    const { progressPeer = 0 } = this.props;
    let res = "Сервер: отключен";
    switch (progressPeer) {
      case 0:
        break;
      case 1:
          res = "Сервер: подключение ...";
          break;
      case 2:
        res = "Сервер: регистрация ...";
        break;
      case 3:
          res = "Сервер: подключен";
   
      }
    return res;
  }

  _debugInfoCall() {
    const { progressCall = 0 } = this.props;
    let res = "Чат: отключен";
    switch (progressCall) {
      case 0:
        break;
      case 1:
          res = "Чат: подключение...";
          break;
      case 2:
        res = "Чат: подключен";
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

  render() {
    const { progressCall = 0, progressPeer = 0 } = this.props;

    return (
      <div id="ViewMain" className="inner-container">
        <ViewRemote />
        <ViewLocal />
        <button className="button-connect" onClick={this._onConnectPeerServer} disabled={!this.state.localName}>Подкл Сервер</button>
        <button className="button-call" onClick={this._onCall} disabled={progressPeer !== 3}>Позвонить</button>
        <div className="inputs">
          <label>
            Moё Имя
            <input type="text" value={this.state.localName} onChange={this._onChangeLocalName} />
          </label>
          <p />
          <label>
            Позвонить Имя
            <input type="text" value={this.state.remoteName} onChange={this._onChangeRemoteName} />
          </label>
        </div>
        <div className="dbg-info">
          {this._debugInfo()}
        </div>
      </div>
    );
  }
}

//export default ViewMain;
export default connect(mapStateToProps, mapDispatchToProps)(ViewMain);
