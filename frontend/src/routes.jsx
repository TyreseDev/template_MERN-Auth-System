import { Navigate, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";

import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
import DashboardPage from "./pages/dashboard/DashboardPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import Page404 from "./pages/Page404";

export default function Router() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const routes = useRoutes([
    {
      path: "/",
      element: isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: "dashboard", element: <DashboardPage /> },
      ],
    },
    {
      path: "login",
      element: isAuthenticated ? <Navigate to="/" /> : <LoginPage />,
    },
    {
      path: "register",
      element: isAuthenticated ? <Navigate to="/" /> : <RegisterPage />,
    },
    {
      path: "404",
      element: isAuthenticated ? <SimpleLayout /> : <Navigate to="/login" />,
      children: [{ element: <Page404 />, index: true }],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
