import React, { Component } from 'react';
import ViewLocal from './ViewLocal'
import ViewRemote from './ViewRemote'
import { call, hungup } from '../call/actions'
import { connect } from "react-redux";
import { connectPeerServer } from '../peer-server/actions';
import { fetchNewTime } from "../redux/actionCreators";
import { VERSION } from '../version';
import { getUrlPeerServer } from '../config'
import  ButtonCall  from '../controls/ButtonCall'
import  ButtonRegister  from '../controls/ButtonRegister'


import { IconRegister } from '../../images';

import '../../css/Buttons.css';
import '../../css/ViewMain.css';
import '../../css/test.css'

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

  handleSubmit = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${this.state.localName}`);
  }

  render() {
    const { progressCall = 0, progressPeer = 0 } = this.props;

    return (
      <div id="ViewMain" className="inner-container">
        <ViewRemote />
        <ViewLocal />

        <ButtonCall onClick={this._onCall} disabled={!this.state.remoteName}/>
        <ButtonRegister onClick={this._onConnectPeerServer} disabled={!this.state.localName}/>
        <div className="inputs">
        <form onSubmit={this.handleSubmit}
        method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
  <input type="text" placeholder="Введите свое имя"/>
  <a type="submit" className="fi-mail"></a>
</form>
        {/* <form onSubmit={this.handleSubmit}>
      <label>Enter your name:
        <input
          type="text" 
          value={this.state.localName}
          onChange={this._onChangeLocalName}
        />
      </label>
      <button type="submit" className='button-base'/>
    </form> */}



{/*           
          <label>
            Moё Имя
            <input type="text" value={this.state.localName} onChange={this._onChangeLocalName} />
          </label>
          <p />
          <label>
            Позвонить Имя
            <input type="text" value={this.state.remoteName} onChange={this._onChangeRemoteName} />
          </label> */}
        </div>



        <div className="dbg-info">
          {this._debugInfo()}
        </div>
        <textarea>
  Привет! Тут просто немного текста внутри тега textarea
</textarea>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewMain);
