import React from 'react';
import { connect } from "react-redux";
import { ButtonBase } from './ButtonBase';
import { hideDialog } from '../dialogs/actions';

import '../../css/Buttons.css';

type Props = {
    onClick: Function,
    classes: Object
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchHideDialog: () => dispatch(hideDialog()),
    }
}

class ButtonDialogOk extends ButtonBase {

    constructor(props: Props) {
        super(props);

        this._hideDialog = this._hideDialog.bind(this);
        this._onClick = this._onClick.bind(this);
    }

    _onClick() {
        const { onClick } = this.props;
        if (onClick) {
            onClick();
        }

        this._hideDialog();
    }

    _hideDialog() {
        console.log('ButtonDialogOk hideDialog');
        const { dispatchHideDialog } = this.props;
        dispatchHideDialog();
    }

    render() {
        return (
            <> 
                {<ButtonBase 
                    cssStyle={'button-base button-dialog'}
                    caption={'OK'}
                    onClick={this._onClick}
                    disabled={false}
                />}
            </>
        );
    }
}

export default connect(null, mapDispatchToProps)(ButtonDialogOk);

