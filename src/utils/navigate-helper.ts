import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};

type NavigateFunctionType = ((page: string, ...rest: any[]) => void) | null;

export const History = {
  navigate: null as NavigateFunctionType,
  push: (page: string, ...rest: any[]) => {
    if (History.navigate) {
      History.navigate(page, ...rest);
    } else {
      console.warn("History.navigate has not been initialized.");
    }
  },
};

export const NavigateSetter = () => {
  History.navigate = useNavigate();

  return null;
};
