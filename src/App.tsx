import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import LandingPage from './pages/landing-page';
import Login from './pages/login';
import './styles/App.css';

// PrimeFaces css
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";      

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LANDING_PAGE} element={<LandingPage />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
      </Routes>
    </BrowserRouter>
    // <div className="App">
    //   <h1 className="text-3xl font-bold underline">Hello world!</h1>
    //   <Login />
    // </div>
  );
}

export default App;
