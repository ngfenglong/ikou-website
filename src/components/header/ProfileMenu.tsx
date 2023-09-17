import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import * as ROUTES from "./../../constants/routes";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const loggedInMenu: MenuItemType[] = [
  {
    menuItemName: "Add New Place",
    redirectUrl: ROUTES.ADD_PLACES,
  },
  {
    menuItemName: "Your Profile",
    redirectUrl: ROUTES.PROFILE,
  },
  {
    menuItemName: "Setting",
    redirectUrl: ROUTES.SETTING,
  },
];

const loggedOutMenu: MenuItemType[] = [
  {
    menuItemName: "Sign up",
    redirectUrl: ROUTES.SIGN_UP,
  },
  {
    menuItemName: "Log in",
    redirectUrl: ROUTES.LOGIN,
  },
];

const ProfileMenu = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const onLogout = () => {
    try {
      logout();
      navigate(ROUTES.LOGIN);
    } catch (error) {}
  };

  return isAuthenticated ? (
    <Menu as="div" className="relative ml-4 flex-shrink-0">
      <div>
        <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src={user?.profile_image}
            alt=""
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {loggedInMenu.map((menuItem, idx) => (
            <Menu.Item key={idx}>
              {({ active }) => (
                <Link
                  to={menuItem.redirectUrl}
                  className={`block px-4 py-2 text-sm text-gray-700 ${
                    active ? "bg-gray-100" : ""
                  }`}
                >
                  {menuItem.menuItemName}
                </Link>
              )}
            </Menu.Item>
          ))}
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={onLogout}
                className={`block w-full text-left px-4 py-2 text-sm text-gray-700 ${
                  active ? "bg-gray-100" : ""
                } focus:outline-none`}
              >
                Logout
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  ) : (
    <Menu as="div" className="relative ml-4 flex-shrink-0">
      <div>
        <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src={user?.profile_image}
            alt=""
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {loggedOutMenu.map((menuItem, idx) => (
            <Menu.Item key={idx}>
              {({ active }) => (
                <Link
                  to={menuItem.redirectUrl}
                  className={`block px-4 py-2 text-sm text-gray-700 ${
                    active ? "bg-gray-100" : ""
                  }`}
                >
                  {menuItem.menuItemName}
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

type MenuItemType = {
  menuItemName: string;
  redirectUrl: string;
  onClick?: () => void;
};

export default ProfileMenu;
