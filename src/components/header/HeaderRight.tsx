import { BellIcon } from '@heroicons/react/24/outline';
import ProfileMenu from './ProfileMenu';

const HeaderRight = () => {
  const loggedIn = false;
  return (
    <div className="hidden lg:ml-4 lg:flex lg:items-center">
      <button
        type="button"
        className="flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-primary focus:ring-offset-2"
      >
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Profile dropdown */}
      <ProfileMenu isLoggedIn={loggedIn} />
    </div>
  );
};

export default HeaderRight;
