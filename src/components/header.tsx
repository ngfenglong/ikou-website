import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import {
  LogoutIcon,
  MyPlaceIcon,
  MyTripIcon,
  ProfileIcon,
  SavedIcon,
} from '../icons';

const Header = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const username = 'Feng Long';

  const toggleProfileMenu = () => {
    setShowProfileMenu((showProfileMenu) => !showProfileMenu);
    console.log('current state', showProfileMenu);
  };

  return (
    <header className="h-18 bg-white border-b border-gray-primary mb-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link to={ROUTES.LANDING_PAGE} aria-label="Ikou logo">
                <img
                  src="/images/logo.png"
                  alt="Ikou"
                  className="mt-2 w-6/12"
                />
              </Link>
            </h1>
          </div>
          <div className="text-gray-700 flex flex-row items-center align-items">
            <div className="text-center cursor-pointer">{username}</div>

            <div className="relative">
              <ProfileIcon
                className="w-8 h-8 cursor-pointer"
                onClick={toggleProfileMenu}
              />
              {showProfileMenu && (
                <div className="flex flex-col p-2 max-w-xl bg-white rounded-lg border border-gray-200 shadow-md absolute top-6 right-6 w-22">
                  <Link
                    to={ROUTES.LANDING_PAGE}
                    className="flex flex-row w-22 px-6 py-2 hover:bg-gray-300 rounded-lg"
                  >
                    <MyTripIcon className="mr-2" />
                    <div>My Trip</div>
                  </Link>
                  <Link
                    to={ROUTES.LANDING_PAGE}
                    className="flex flex-row w-22 px-6 py-2 hover:bg-gray-300 rounded-lg"
                  >
                    <MyPlaceIcon className="mr-2" />
                    My Place
                  </Link>
                  <Link
                    to={ROUTES.LANDING_PAGE}
                    className="flex flex-row w-22 px-6 py-2 hover:bg-gray-300 rounded-lg"
                  >
                    <SavedIcon className="mr-2" />
                    Saved
                  </Link>
                  <Link
                    to={ROUTES.LANDING_PAGE}
                    className="flex flex-row w-22 px-6 py-2 hover:bg-gray-300 rounded-lg"
                  >
                    <LogoutIcon className="mr-2" />
                    Signed out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  // return <div>I am the Header</div>
};
export default Header;
