import { createContext, useState, useCallback } from "react";
import { ALERT_TYPE } from "../constants/theme-config";

export interface AlertContextData {
  alertType: ALERT_TYPE | null;
  alertHeader: string | null;
  alertDescription: string | null;
  displayAlert: (
    alertType: ALERT_TYPE,
    alertHeader: string,
    alertDescription: string,
  ) => void;
  resetAlert: () => void;
}

export const AlertContext = createContext<AlertContextData>({
  alertType: null,
  alertHeader: null,
  alertDescription: null,
  displayAlert: () => {},
  resetAlert: () => {},
});

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alertType, setAlertType] = useState<ALERT_TYPE | null>(null);
  const [alertHeader, setAlertHeader] = useState<string | null>(null);
  const [alertDescription, setAlertDescription] = useState<string | null>(null);

  const displayAlert = useCallback(
    (alertType: ALERT_TYPE, alertHeader: string, alertDescription: string) => {
      setAlertType(alertType);
      setAlertHeader(alertHeader);
      setAlertDescription(alertDescription);
    },
    [],
  );

  const resetAlert = useCallback(() => {
    setAlertType(null);
    setAlertHeader(null);
    setAlertDescription(null);
  }, []);

  const value = {
    alertType,
    alertHeader,
    alertDescription,
    displayAlert,
    resetAlert,
  };
  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};
