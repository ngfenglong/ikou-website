import React from "react";
import ReactDOM from "react-dom";
import NotificationCard from "./NotificationCard";
import { ALERT_TYPE } from "../../constants/theme-config";
import useNotification from "../../hooks/useNotification";

interface NotificationPortalProps {
  notificationType: ALERT_TYPE;
  notificationHeader: string;
  notificationDescription: string;
}

const NotificationPortal: React.FC<NotificationPortalProps> = ({
  notificationType,
  notificationHeader,
  notificationDescription,
}) => {
  return ReactDOM.createPortal(
    <NotificationCard
      notificationType={notificationType}
      notificationHeader={notificationHeader}
      notificationDescription={notificationDescription}
    />,
    document.getElementById("notification-root") as Element,
  );
};

const NotificationDisplay = () => {
  const { notificationType, notificationHeader, notificationDescription } =
    useNotification();

  return notificationType && notificationHeader && notificationDescription ? (
    <NotificationPortal
      notificationType={notificationType}
      notificationHeader={notificationHeader}
      notificationDescription={notificationDescription}
    />
  ) : null;
};

export default NotificationDisplay;
