import React, { Component } from 'react';
import { connect } from "react-redux";

import { slide as Menu } from "react-burger-menu";
import DialogConnectivity from '../config/DialogConnectivity';
import {openDialog} from '../dialogs/actions'

function showDlgUserProfile() {
  console.log('@@@ showDlgUserProfile');
}

function showDlgConnectivity() {
  console.log('@@@ showDlgConnectivity');
 // openDialog2(DialogConnectivity);
}

/*export default props => {
  return (
    // Pass on our props
    <Menu {...props}>
      <a className="menu-item" onClick={showDlgUserProfile}>
        Пользователь
      </a>
      <a className="menu-item" onClick={showDlgConnectivity}>
        Подключение
      </a>
    </Menu>
  );
};
*/

const mapStateToProps = state => {
  return {
  };
};


// const mapDispatchToProps = dispatch => ({
//   dispatchOpenDialog: (component, componentProps) => openDialog(component, componentProps),
// });

const wmapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' }),
    reset: () => dispatch({ type: 'RESET' }),
  }
}


type Props = {
  classes: Object,
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchOpenDialog: (component, componentProps) => dispatch(
      openDialog(component, componentProps)),
  }
}


class SideBar extends Component {
  constructor(props: Props) {
    super(props);

    this.openDialogConnectivity = this.openDialogConnectivity.bind(this);
  }

  openDialogConnectivity() {
    const { dispatchOpenDialog } = this.props;
    dispatchOpenDialog(DialogConnectivity);
  }
  
  render() {


    return (
        // Pass on our props
        <Menu {...this.props}>
          <a className="menu-item" onClick={showDlgUserProfile}>
            Пользователь
          </a>
          <a className="menu-item" onClick={this.openDialogConnectivity}>
            Подключение
          </a>
        </Menu>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
