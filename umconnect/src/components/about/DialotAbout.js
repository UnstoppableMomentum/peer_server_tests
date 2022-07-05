import React, { Component } from 'react';
import DialogBase from '../dialogs/DialogBase';

import { VERSION } from '../version'

import '../../css/Buttons.css';
import '../../css/DialogAbout.css';
import '../../css/Dialogs.css';


type Props = {
  classes: Object,
};


export default class DialogAbout extends Component {

  constructor(props: Props) {
    super(props);
    this._drawContent = this._drawContent.bind(this);
  }


  _drawContent() {
    return <>
      <img src={require('../../images/png/selenikaLogoAndQrCode.png')} />
      {VERSION}
    </>
  }

  render() {
    const cssStyles = { 
      base : 'dialog-about', 
      innerContainer: 'dialog-about', 
      contentContainer: 'dialog-about', 
      buttonsContainer: 'dialog-about' 
    };
    return (
      <DialogBase cssStyles={cssStyles} content={this._drawContent()} showButonCancel={false} />
    );
  }
}

