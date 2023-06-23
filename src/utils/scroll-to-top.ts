import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Add condition for special case
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};
