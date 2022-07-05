import React, { Component } from 'react';
import { connect } from "react-redux";

import { slide as Menu } from "react-burger-menu";
import DialogConnectivity from '../config/DialogConnectivity';
import { openDialog } from '../dialogs/actions'

import  DialogAbout  from '../about/DialotAbout'

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
    this.openDialogAbout = this.openDialogAbout.bind(this);
  }

  openDialogConnectivity() {
    const { dispatchOpenDialog } = this.props;
    dispatchOpenDialog(DialogConnectivity);
  }

  openDialogAbout() {
    const { dispatchOpenDialog } = this.props;
    dispatchOpenDialog(DialogAbout);
  }

  render() {
    return (
      // Pass on our props
      <Menu {...this.props}>
        <a className="menu-item" onClick={this.openDialogConnectivity}>
          Подключение
        </a>
        <a className="menu-item" onClick={this.openDialogAbout}>
          Selenika
        </a>
      </Menu>
    );
  }
}

export default connect(null, mapDispatchToProps)(SideBar);
