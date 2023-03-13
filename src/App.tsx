import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import LandingPage from './pages/landing-page';
import Login from './pages/login';
import Footer from './components/footer/Footer';
import './styles/App.css';

// PrimeFaces css
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <Routes>
          <Route path={ROUTES.LANDING_PAGE} element={<LandingPage />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
