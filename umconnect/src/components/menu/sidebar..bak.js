import React from "react";
import { slide as Menu } from "react-burger-menu";
import DialogConnectivity from '../config/DialogConnectivity';
import {openDialog2} from '../dialogs/DialogContainer'

function showDlgUserProfile() {
  console.log('@@@ showDlgUserProfile');
}

function showDlgConnectivity() {
  console.log('@@@ showDlgConnectivity');
 // openDialog2(DialogConnectivity);
}

export default props => {
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
