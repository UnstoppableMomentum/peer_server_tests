import React, { Component } from 'react';
import ButtonDialogCancel from '../controls/ButtonDialogCancel';
import ButtonDialogOk from '../controls/ButtonDialogOk';

import { connect } from "react-redux";


import '../../css/ViewMain.css';
import '../../css/TextInput.css';
import '../../css/Buttons.css';
import '../../css/Dialogs.css';


type Props = {
  content: string,
  classes: Object,
};

export default class DialogBase extends Component {

  constructor(props: Props) {
    super(props);
}

  render() {
    const {content, onSubmit} = this.props;
    console.log('dialog base %o %o ', content, onSubmit);
    return (
      <div id="DialogBase" className="dialog-base">
        <div className="dialog-content-container">
          {content}
        </div>
        <div className="dialog-buttons-container">
        <ButtonDialogCancel/>
        <ButtonDialogOk onClick={onSubmit}/>
        </div>
      </div>
    );
  }
}

