import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

const Layout = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-between bg-slate-50">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default Layout;
