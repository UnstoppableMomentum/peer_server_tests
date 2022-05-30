import React, { Component } from 'react';
import { connect } from "react-redux";
import { ButtonBase } from './ButtonBase';
import { IconCall } from '../../images';

import '../../css/Buttons.css';

type Props = {
  progressPeer: 0,
  classes: Object,
};

class ButtonCall extends ButtonBase {

  constructor(props: Props) {
    super(props);
  }

  render() {
    const { disabled, onClick, progressPeer } = this.props;
    const showButton = progressPeer == 3;
    return (
      <>
      { showButton ?  <ButtonBase icon={ IconCall } cssStyle={'button-base button-call2'} onClick={onClick} disabled={disabled}/> : null }
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

export default connect(mapStateToProps)(ButtonCall);