import React, { Component } from 'react';

import DialogConnectivity from '../config/DialogConnectivity';
import {openDialog} from '../dialogs/actions'

import {
  CALL_STATE_DISCONNECTED,
  CALL_STATE_CONNECTED
} from '../call';

import { slide as Menu } from 'react-burger-menu';

// import '../../css/MenuMain.css';

import './fonts/font-awesome-4.2.0/css/font-awesome.min.css';
import './normalize.css';

type Props = {
  progressCall: CALL_STATE_DISCONNECTED,
  classes: Object,
};

export default class MenuMain extends Component {

  constructor(props: Props) {
    super(props);

    this.showProfile = this.showProfile.bind(this);
    this.showConnectivity = this.showConnectivity.bind(this);
  }

  showProfile(event) {
    event.preventDefault();
  }

  showConnectivity(event) {
    event.preventDefault();
    openDialog(DialogConnectivity);
  }


  render() {
    return (
      <Menu outerContainerId={'outer-container'}>
        <a onClick={this.showProfile} id="profile" className="menu-item" href="">Пользователь</a>
        <a onClick={this.showConnectivity} id="connectivity" className="menu-item" href="">Подключение</a>
        <a onClick={this.showSettings} className="menu-item--small" href="">Settings</a>
      </Menu>
    );
  }
}


// const mapStateToProps = state => {
//     const { progress: progressCall = CALL_STATE_DISCONNECTED } = state?.call;
//     return {
//         progressCall
//     };
// };

//export default connect(mapStateToProps)(MenuMain);
