import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// @ts-ignore
import { ToastContainer } from "react-toastify";
import SignUp from "./SignUp/SignUp.tsx";
import Header from "../components/Header/Header.tsx";
import SignIn from "./SignIn/SignIn.tsx";
import Home from "./Home/Home.tsx";
import { useSelector } from "react-redux";
import { UserSelectors } from "../redux/reducers/userSlice.ts";

export enum RoutesList {
  Home = "/",
  SignUp = "/sign-up",
  SignIn = "/sign-in",
  Default = "*",
}

const Router = () => {
  const isLoggedIn = useSelector(UserSelectors.getUserIsLoggedIn);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={RoutesList.Home} element={<Header />}>
            <Route
              path={RoutesList.Home}
              element={
                isLoggedIn ? <Home /> : <Navigate to={RoutesList.SignIn} />
              }
            />
            <Route
              path={RoutesList.SignUp}
              element={
                isLoggedIn ? <Navigate to={RoutesList.Home} /> : <SignUp />
              }
            />
            <Route
              path={RoutesList.SignIn}
              element={
                isLoggedIn ? <Navigate to={RoutesList.Home} /> : <SignIn />
              }
            />
            <Route
              path={RoutesList.Default}
              element={<Navigate to={RoutesList.Home} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default Router;
