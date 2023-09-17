import { createContext, useState, useCallback } from "react";
import { ALERT_TYPE } from "../constants/theme-config";

export interface NotificationContextData {
  notificationType: ALERT_TYPE | null;
  notificationHeader: string | null;
  notificationDescription: string | null;
  triggerNotification: (
    notificationType: ALERT_TYPE,
    header: string,
    description: string,
  ) => void;
  resetNotification: () => void;
}

export const NotificationContext = createContext<NotificationContextData>({
  notificationType: null,
  notificationHeader: null,
  notificationDescription: null,
  triggerNotification: () => {},
  resetNotification: () => {},
});

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notificationType, setNotificationType] = useState<ALERT_TYPE | null>(
    null,
  );
  const [notificationHeader, setNotificationHeader] = useState<string | null>(
    null,
  );
  const [notificationDescription, setNotificationDescription] = useState<
    string | null
  >(null);

  const resetNotification = useCallback(() => {
    setNotificationType(null);
    setNotificationHeader(null);
    setNotificationDescription(null);
  }, []);

  const triggerNotification = useCallback(
    (notificationType: ALERT_TYPE, header: string, description: string) => {
      setNotificationType(notificationType);
      setNotificationHeader(header);
      setNotificationDescription(description);
      setTimeout(() => {
        resetNotification();
      }, 3000); // hides the notification after 3 seconds
    },
    [resetNotification],
  );

  const value = {
    notificationType,
    notificationHeader,
    notificationDescription,
    triggerNotification,
    resetNotification,
  };
  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
