import * as ROUTES from './../../constants/routes';

const Navigation = () => {
  return (
    <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
      {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
      <a
        href={ROUTES.LANDING_PAGE}
        className="inline-flex items-center border-b-2 border-blue-primary px-1 pt-1 text-sm font-medium text-gray-900"
      >
        Explore
      </a>
      <a
        href={ROUTES.TRIPS}
        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
      >
        Trips
      </a>
      <a
        href={ROUTES.ACTIVITIES}
        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
      >
        Activities
      </a>
      <a
        href={ROUTES.PLACES}
        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
      >
        Places
      </a>
    </div>
  );
};

export default Navigation;
