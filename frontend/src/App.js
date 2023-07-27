import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";
import Router from "./routes";
import ThemeProvider from "./theme";
import { StyledChart } from "./components/chart";
import setAuthToken from "./utils/setAuthToken";
import ScrollToTop from "./components/scroll-to-top";
import { setCurrentUser, logoutUser } from "./redux/actions/authActions";
import store from "./redux/store";

if (localStorage.getItem("jwtToken")) {
  setAuthToken(localStorage.getItem("jwtToken"));
  const userDecoded = jwt_decode(localStorage.getItem("jwtToken"));
  store.dispatch(setCurrentUser(userDecoded));
  // Check for expired time
  const currentTime = Date.now() / 1000;
  if (userDecoded.exp < currentTime) {
    // Logout
    store.dispatch(logoutUser());
    // User
    store.dispatch(setCurrentUser({}));
    window.location.href = "/";
  }
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
