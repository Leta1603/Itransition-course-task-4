import { BrowserRouter, Route, Routes } from "react-router-dom";
// @ts-ignore
import { ToastContainer } from "react-toastify";
import SignUp from "./SignUp/SignUp.tsx";
import Header from "../components/Header/Header.tsx";
import SignIn from "./SignIn/SignIn.tsx";
import Home from "./Home/Home.tsx";
import { UserInfoResponse } from "../redux/@type.ts";

export enum RoutesList {
  Home = "/",
  SignUp = "/sign-up",
  SignIn = "/sign-in",
  Default = "*",
}

const Router = () => {
  const storedData = localStorage.getItem("userInfo");
  const userInfo: UserInfoResponse = storedData && JSON.parse(storedData);
  const isLoggedIn = !!userInfo;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={RoutesList.Home} element={<Header />}>
            <Route
              path={RoutesList.Home}
              element={isLoggedIn ? <Home /> : <SignIn />}
            />
            <Route path={RoutesList.SignUp} element={<SignUp />} />
            <Route path={RoutesList.SignIn} element={<SignIn />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default Router;
