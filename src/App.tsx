import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import './styles/App.css';

// PrimeFaces css
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// Pages
import SignUp from './pages/signup';
import LandingPage from './pages/landing-page';
import Login from './pages/login';
import PageNotFound from './pages/error-page/PageNotFound';
import Layout from './pages/root/Layout';
import ComingSoonPage from './pages/error-page/ComingSoon';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.LANDING_PAGE} element={<LandingPage />} />
          <Route path={ROUTES.TRIPS} element={<ComingSoonPage />} />
          <Route path={ROUTES.ACTIVITIES} element={<ComingSoonPage />} />
          <Route path={ROUTES.PLACES} element={<ComingSoonPage />} />
          <Route path={ROUTES.SETTING} element={<ComingSoonPage />} />
          <Route path={ROUTES.ALL} element={<PageNotFound />} />
        </Route>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
