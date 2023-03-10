import { Link } from 'react-router-dom';
import { LogoNoWording } from '../logo/Logo';
import Navigation from './Navigation';
import * as ROUTES from '../../constants/routes';

const HeaderLeft = () => {
  return (
    <div className="flex px-2 lg:px-0">
      <div className="flex flex-shrink-0 items-center">
        <Link to={ROUTES.LANDING_PAGE} aria-label="Ikou logo">
          <LogoNoWording className="h-8 w-auto" />
        </Link>
      </div>
      <Navigation />
    </div>
  );
};

export default HeaderLeft;
