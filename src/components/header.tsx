import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

const Header = () => {
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
          <div>Some menu</div>
        </div>
      </div>
    </header>
  );

  // return <div>I am the Header</div>
};
export default Header;
