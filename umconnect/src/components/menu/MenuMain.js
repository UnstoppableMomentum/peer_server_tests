import React, { Component } from 'react';

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

    this._getStyle = this._getStyle.bind(this);
//    this._onCall = this._onCall.bind(this);
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

    showSettings (event) {
        event.preventDefault();
      }

    async componentDidMount() {
       // await initMedia();
    }

    render() {
        return (
            <Menu outerContainerId={'outer-container'}>
              <a id="home" className="menu-item" href="/">Home</a>
              <a id="about" className="menu-item" href="/about">About</a>
              <a id="contact" className="menu-item" href="/contact">Contact</a>
              <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
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
