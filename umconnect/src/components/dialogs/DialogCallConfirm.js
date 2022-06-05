import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export const DialogCallConfirm = (from, onCall, onReject) => {
    confirmAlert({
      title: 'Входящий вызов',
      message: from,
      buttons: [
        {
          label: 'Принять',
          onClick: () => onCall()
        },
        {
          label: 'Отклонить',
          onClick: () => onReject()
        }
      ]
    });
  };