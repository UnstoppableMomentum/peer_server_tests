/* @flow */

import React, { Component } from 'react';
import { connect } from "react-redux";
import { openDialog } from './actions';


const mapDispatchToProps = dispatch => ({
    dispatchOpenDialog: (component, componentProps) => openDialog(component, componentProps),
});

const mapStateToProps = state => {
    const {
        component,
        componentProps
    } = state?.dialogContainer;

    return {
        component,
        componentProps
    };
};

// export function openDialog2(component, componentProps)
// {
//     console.log('openDialog2');
//     dispatchOpenDialog(component, componentProps);
// }

/**
 * The type of the React {@code Component} props of {@link DialogContainer}.
 */
type Props = {

    /**
     * The component to render.
     */
    component: Function,

    /**
     * The props to pass to the component that will be rendered.
     */
    componentProps: Object
};

/**
 * Implements a DialogContainer responsible for showing all dialogs.
 */
class DialogContainer extends Component<Props> {


    constructor(props: Props) {
        super(props);
      }

    onOpenDialog(component, componentProps) {

    }

    /**
     * Returns the dialog to be displayed.
     *
     * @private
     * @returns {ReactElement|null}
     */
    _renderDialogContent() {
        const {
            component,
            componentProps
        } = this.props;

        return (
            <React.Fragment>
            {component
                ? React.createElement(component, componentProps)
                : null}
            </React.Fragment>
        )
    }

    render() {
        return this._renderDialogContent();
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(DialogContainer);
