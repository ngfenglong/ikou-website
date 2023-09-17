import { useContext } from "react";
import { AlertContext } from "../context/AlertContext";

const useAlert = () => {
  const context = useContext(AlertContext);

  if (!context) {
    // Throw error
  }

  return context;
};

export default useAlert;
