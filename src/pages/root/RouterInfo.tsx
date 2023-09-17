import { PERMISSION } from "./Permission.constant";

const RouterInfo = {
  root: "/ikou",
  login: {
    pageTitle: "Login",
    route: "/login",
  },
  adminMain: {
    pageTitle: "Admin",
    route: "/adminMain",
    permission: [],
  },
  adminPlace: {
    pageTitle: "Admin - Place",
    route: "/adminPlace",
    permission: [PERMISSION.CREATE_USER],
  },
  landingPage: {
    pageTitle: "Ikou - Landing",
    route: "/landing",
  },
};

export default RouterInfo;
