import { BellIcon } from '@heroicons/react/24/outline';
import ProfileMenu from './ProfileMenu';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const HeaderRight = () => {
  const { user, isAuthenticated } = useAuth();

  if (!user || !isAuthenticated) {
    return (
      <div className="hidden lg:ml-4 lg:flex lg:items-center">
        <div className="flex flex-1 items-center justify-end gap-x-6">
          <Link
            to={ROUTES.LOGIN}
            className="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900"
          >
            Log in
          </Link>
          <Link
            to={ROUTES.SIGN_UP}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign up
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="hidden lg:ml-4 lg:flex lg:items-center">
      <button
        type="button"
        className="flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Profile dropdown */}
      <ProfileMenu />
    </div>
  );
};

export default HeaderRight;
