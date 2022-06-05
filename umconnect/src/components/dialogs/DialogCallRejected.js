import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export const DialogCallRejected = (from) => {
  confirmAlert({
    title: 'Вызов отклонён',
    message: `Пользователь "${from}"`,
    buttons: [
      {
        label: 'OK',
      }
    ]
  });
};
