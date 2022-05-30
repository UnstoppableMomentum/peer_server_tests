import React, { Component } from 'react';

import '../../css/Buttons.css';

type Props = {
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
    const { disabled, cssStyle, icon: IconComponent, onClick } = this.props;
    let cssStyle_ = cssStyle ? cssStyle : 'button-base';
    if (disabled) {
      cssStyle_ += ' button-disabled';
    }
    return (
      <div className={ cssStyle_ } onClick={disabled ? null: onClick}>
        <IconComponent className='button-base-icon'/>
      </div>
    );
  }
}

