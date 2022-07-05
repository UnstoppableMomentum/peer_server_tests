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
    const {cssStyles = {}, content, onSubmit, showButtonOk = true, showButonCancel = true } = this.props;
    console.log('dialog base cssStyles: %o %o %o ', cssStyles, content, onSubmit);

    const { base, innerContainer, contentContainer, buttonsContainer } = cssStyles;
    const classBase = base ? `dialog-container ${base}`: "dialog-container";
    const classInnerContainer = innerContainer ? `dialog-inner-container ${innerContainer}`: "dialog-inner-container";
    const classContentContainer = contentContainer ? `dialog-content-container ${contentContainer}`: "dialog-content-container";
    const classButtonsContainer = buttonsContainer ? `dialog-buttons-container ${buttonsContainer}`: "dialog-buttons-container";

    return (
      <div id="DialogBase" className={classBase}>
        <div className={classInnerContainer}>
          <div className={classContentContainer}>
            {content}
          </div>
          <div className={classButtonsContainer}>
            { showButonCancel ? <ButtonDialogCancel/> : null }
            { showButtonOk ? <ButtonDialogOk onClick={onSubmit}/> : null }
          </div>
        </div>
      </div>
    );
  }
}

