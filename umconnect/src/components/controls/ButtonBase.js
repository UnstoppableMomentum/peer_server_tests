import React, { Component } from 'react';

import '../../css/Buttons.css';

type Props = {
  caption: String,
  disabled: boolean,
  icon: Object,
  onClick: Object,
  cssStyle: String,
  classes: Object,
};

export class ButtonBase extends Component {

  constructor(props: Props) {
    super(props);
    this.state = {
      localName: ''
    };
  }

  render() {
    const { caption, disabled, cssStyle, icon: IconComponent, onClick } = this.props;
    let cssStyle_ = cssStyle ? cssStyle : 'button-base';
    if (disabled) {
      cssStyle_ += ' button-disabled';
    }
    return (
      <div className={ cssStyle_ } onClick={disabled ? null: onClick}>
        { IconComponent ? <IconComponent className='button-base-icon'/> : null }
        { caption }
      </div>
    );
  }
}

