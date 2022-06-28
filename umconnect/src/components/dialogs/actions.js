import { HIDE_DIALOG, OPEN_DIALOG } from './actionTypes';

export function hideDialog() {
    return {
        type: HIDE_DIALOG
    };
}

export function openDialog(component, componentProps) {
    return {
        type: OPEN_DIALOG,
        payload: {
            component,
            componentProps
        }
    };
}
