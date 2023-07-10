import { Disclosure } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import * as ROUTES from './../../constants/routes';
import useAuth from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAlert from '../../hooks/useAlert';
import { ALERT_TYPE } from '../alert/Alert';
import { LogoNoWording } from '../logo/Logo';

const HeaderMobile = ({ open }: { open: boolean }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { displayAlert } = useAlert();
  const navigate = useNavigate();
  const location = useLocation();
  const onLogoutClick = () => {
    try {
      logout();
      navigate(ROUTES.LOGIN);
    } catch (err) {
      displayAlert(ALERT_TYPE.ERROR, 'Logout Fail', 'Login Fail');
    }
  };

  return (
    <>
      <div className="flex items-center lg:hidden">
        {/* Mobile menu button */}
        <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
          <span className="sr-only">Open main menu</span>
          {open ? (
            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
          ) : (
            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
          )}
        </Disclosure.Button>
      </div>
      <Disclosure.Panel className="lg:hidden fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex justify-between items-center mb-4">
          <LogoNoWording className="h-8 w-auto" />
          <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
          </Disclosure.Button>
        </div>

        <div className="space-y-1 pt-2 pb-3">
          {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}
          <Disclosure.Button
            as="a"
            href={ROUTES.LANDING_PAGE}
            className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium${
              location.pathname === ROUTES.LANDING_PAGE
                ? ' border-indigo-500 bg-indigo-50 text-indigo-700 '
                : ' border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 '
            }`}
          >
            Explore
          </Disclosure.Button>
          <Disclosure.Button
            as="a"
            href={ROUTES.TRIPS}
            className={`block border-l-4  py-2 pl-3 pr-4 text-base font-medium ${
              location.pathname === ROUTES.TRIPS
                ? ' border-indigo-500 bg-indigo-50 text-indigo-700 '
                : ' border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 '
            }`}
          >
            Trips
          </Disclosure.Button>
          <Disclosure.Button
            as="a"
            href={ROUTES.ACTIVITIES}
            className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
              location.pathname === ROUTES.ACTIVITIES
                ? ' border-indigo-500 bg-indigo-50 text-indigo-700 '
                : ' border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 '
            }`}
          >
            Activities
          </Disclosure.Button>
          <Disclosure.Button
            as="a"
            href={ROUTES.PLACES}
            className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
              location.pathname === ROUTES.PLACES
                ? ' border-indigo-500 bg-indigo-50 text-indigo-700 '
                : ' border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 '
            }`}
          >
            Places
          </Disclosure.Button>
        </div>
        {(!user || !isAuthenticated) && (
          <div className="border-t border-gray-200 pt-4 pb-3">
            <div className="flex items-center px-4">
              <Link
                to={ROUTES.LOGIN}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </Link>
            </div>
          </div>
        )}
        {user && isAuthenticated && (
          <div className="border-t border-gray-200 pt-4 pb-3">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src="/images/no_profile.jpeg"
                  alt=""
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">Zell</div>
                <div className="text-sm font-medium text-gray-500">
                  User1@Testing.com
                </div>
              </div>
              <button
                type="button"
                className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-primary focus:ring-offset-2"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-3 space-y-1">
              <Disclosure.Button
                as="a"
                href={ROUTES.ADD_PLACES}
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              >
                Add New Place
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href={ROUTES.PROFILE}
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              >
                Your Profile
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href={ROUTES.SETTING}
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              >
                Settings
              </Disclosure.Button>
              <button
                onClick={onLogoutClick}
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </Disclosure.Panel>
    </>
  );
};

export default HeaderMobile;
