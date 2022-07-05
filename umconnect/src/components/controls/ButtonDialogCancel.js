import React from 'react';
import { connect } from "react-redux";
import { ButtonBase } from './ButtonBase';
import { hideDialog } from '../dialogs/actions';

import '../../css/Buttons.css';

type Props = {
    classes: Object
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchHideDialog: () => dispatch(hideDialog()),
    }
}

class ButtonDialogCancel extends ButtonBase {

    constructor(props: Props) {
        super(props);

        this._hideDialog = this._hideDialog.bind(this);
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
                    caption={'Выход'}
                    onClick={this._hideDialog}
                    disabled={false}
                />}
            </>
        );
    }
}

export default connect(null, mapDispatchToProps)(ButtonDialogCancel);

