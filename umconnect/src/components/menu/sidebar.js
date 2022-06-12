import React from "react";
import { slide as Menu } from "react-burger-menu";

function showDlgUserProfile() {
  console.log('@@@ showDlgUserProfile');
}

export default props => {
  return (
    // Pass on our props
    <Menu {...props}>
      <a className="menu-item" onClick={showDlgUserProfile}>
        Пользователь
      </a>
      <a className="menu-item" href="/about">
        Подключение
      </a>
    </Menu>
  );
};
