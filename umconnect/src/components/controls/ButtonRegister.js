import React, { Component } from 'react';
import { connect } from "react-redux";
import { ButtonBase } from './ButtonBase';
import { IconRegister } from '../../images';

import '../../css/Buttons.css';

type Props = {
  progressPeer: 0,
  classes: Object,
};

class ButtonRegister extends ButtonBase {

  constructor(props: Props) {
    super(props);
  }

  render() {
    const { disabled, onClick, progressPeer } = this.props;
    const showButton = progressPeer != 3;
    let cssStyle_ = 'button-base button-register';
    return (
      <>
      { showButton ?  <ButtonBase icon={ IconRegister } cssStyle={cssStyle_} onClick={onClick} disabled={disabled}/> : null }
      </>
    );
  }
}

const mapStateToProps = state => {
  const { progress: progressPeer = 0 } = state?.peerConnection;
  return {
    progressPeer
  };
};

export default connect(mapStateToProps)(ButtonRegister);