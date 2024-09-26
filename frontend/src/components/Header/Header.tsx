import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import styles from "./Header.module.scss";
import { UserInfoResponse } from "../../redux/@type.ts";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/userSlice.ts";
import { RoutesList } from "../../pages/Router.tsx";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storedData = localStorage.getItem("userInfo");
  const userInfo: UserInfoResponse = storedData && JSON.parse(storedData);
  const isLoggedIn = !!userInfo;


  const onBtnClick = () => {
    localStorage.setItem("userInfo", JSON.stringify(null));
    dispatch(setUser(null));
    navigate(RoutesList.SignIn);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerContainer}>
          {userInfo?.fullName && <p>Hello, {userInfo.fullName}</p>}
          <Button variant="outlined" onClick={onBtnClick}>
            {isLoggedIn ? "Log out" : "Sign In"}
          </Button>
        </div>
      </div>
      <div className={styles.container}>
        <Outlet />
      </div>
    </div>
  );
};

export default Header;
