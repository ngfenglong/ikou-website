import { Link, useLocation } from "react-router-dom";
import * as ROUTES from "./../../constants/routes";

const Navigation = () => {
  const location = useLocation();

  return (
    <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
      {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
      <Link
        to={ROUTES.LANDING_PAGE}
        className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium text-gray-900 ${
          location.pathname === ROUTES.LANDING_PAGE
            ? " border-blue-primary"
            : " border-transparent "
        }`}
      >
        Explore
      </Link>
      <Link
        to={ROUTES.TRIPS}
        className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 ${
          location.pathname === ROUTES.TRIPS
            ? " border-blue-primary"
            : " border-transparent "
        }`}
      >
        Trips
      </Link>
      <Link
        to={ROUTES.ACTIVITIES}
        className={`inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 ${
          location.pathname === ROUTES.ACTIVITIES
            ? " border-blue-primary"
            : " border-transparent "
        }`}
      >
        Activities
      </Link>
      <Link
        to={ROUTES.PLACES}
        className={`inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 ${
          location.pathname === ROUTES.PLACES
            ? " border-blue-primary"
            : " border-transparent "
        }`}
      >
        Places
      </Link>
    </div>
  );
};

export default Navigation;
