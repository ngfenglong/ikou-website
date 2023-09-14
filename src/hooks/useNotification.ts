import { useContext } from 'react';
import { NotificationContext } from '../context/NotificationContext';

const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    // Throw error
  }

  return context;
};

export default useNotification;
