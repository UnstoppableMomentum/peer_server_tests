/* @flow */

import { HIDE_DIALOG, OPEN_DIALOG } from './actionTypes';

export const initialState = {
    component: null,
    componentProps: null
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case HIDE_DIALOG:
            return {
                ...state,
                component: null,
                componentProps: null
            };
        case OPEN_DIALOG:
            const { component, componentProps } = action.payload;
            return {
                ...state,
                component,
                componentProps
            };
        default:
            return state;
    }
};
