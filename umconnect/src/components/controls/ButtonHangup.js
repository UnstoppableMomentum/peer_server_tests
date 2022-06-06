import React, { Component } from 'react';
import { connect } from "react-redux";
import { ButtonBase } from './ButtonBase';
import { IconHangUp } from '../../images';

import {
    CALL_STATE_DISCONNECTED,
    CALL_STATE_CONNECTED
  } from '../call';

import '../../css/Buttons.css';

type Props = {
  progressCall: 0,
  classes: Object,
};

class ButtonHangup extends ButtonBase {

  constructor(props: Props) {
    super(props);
  }

  render() {
    const { onClick, progressCall = CALL_STATE_DISCONNECTED } = this.props;
    const showButton = progressCall === CALL_STATE_CONNECTED;
    return (
      <>
      { showButton ?  <ButtonBase icon={ IconHangUp } cssStyle={'button-base button-hangup'} onClick={onClick} disabled={false}/> : null }
      </>
    );
  }
}

const mapStateToProps = state => {
  const { progress: progressCall = CALL_STATE_DISCONNECTED } = state?.call;
  return {
    progressCall
  };
};

export default connect(mapStateToProps)(ButtonHangup);