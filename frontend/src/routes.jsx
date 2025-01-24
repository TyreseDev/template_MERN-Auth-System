import { Navigate, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import Page404 from "./pages/Page404";
import DashboardPage from "./pages/dashboard/DashboardPage";

export default function Router() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const routes = useRoutes([
    {
      path: "/",
      element: <Navigate to="/dashboard" replace />,
    },
    {
      path: "/dashboard",
      element: isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "app", element: <DashboardPage /> },
      ],
    },
    {
      path: "login",
      element: isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />,
    },
    {
      path: "register",
      element: isAuthenticated ? (
        <Navigate to="/dashboard" />
      ) : (
        <RegisterPage />
      ),
    },
    {
      element: isAuthenticated ? <SimpleLayout /> : <Navigate to="/login" />,
      children: [
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
