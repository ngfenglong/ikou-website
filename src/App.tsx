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
import ViewPlaceDetailPage from './pages/places/ViewPlaceDetail';
import AddPlace from './pages/places/AddPlace';
import ForgetPassword from './pages/forget-password-page';
import { AuthProvider } from './context/AuthContext';
import { AlertProvider } from './context/AlertContext';
import ViewPlacesPage from './pages/places/ViewAllPlaces';
import { NavigateSetter, ScrollToTop } from './utils/navigate-helper';
import ViewPlacesByCategoryPage from './pages/places/ViewPlacesByCategory';
import ViewSearchPlaceResultPage from './pages/places/ViewSearchPlaceResult';
import { NotificationProvider } from './context/NotificationContext';
import NotificationDisplay from './components/notification/NotificationPortal';

function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <NotificationProvider>
          <BrowserRouter>
            <NotificationDisplay />
            <NavigateSetter />
            <ScrollToTop />
            <Routes>
              <Route element={<Layout />}>
                <Route path={ROUTES.LANDING_PAGE} element={<LandingPage />} />
                <Route path={ROUTES.TRIPS} element={<ComingSoonPage />} />
                <Route path={ROUTES.ACTIVITIES} element={<ComingSoonPage />} />
                <Route path={ROUTES.ADD_PLACES} element={<AddPlace />} />
                <Route
                  path={ROUTES.VIEW_PLACES_DETAIL}
                  element={<ViewPlaceDetailPage />}
                />
                <Route path={ROUTES.PLACES} element={<ViewPlacesPage />} />
                <Route
                  path={ROUTES.SEARCH}
                  element={<ViewSearchPlaceResultPage />}
                />
                <Route path={ROUTES.SETTING} element={<ComingSoonPage />} />
                <Route
                  path={ROUTES.VIEW_PLACES_BY_CATEGORY}
                  element={<ViewPlacesByCategoryPage />}
                />
                <Route path={ROUTES.ALL} element={<PageNotFound />} />
              </Route>
              <Route path={ROUTES.LOGIN} element={<Login />} />
              <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
              <Route
                path={ROUTES.FORGET_PASSWORD}
                element={<ForgetPassword />}
              />
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </AlertProvider>
    </AuthProvider>
  );
}

export default App;
