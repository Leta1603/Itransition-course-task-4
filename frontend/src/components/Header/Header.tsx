import { Outlet } from "react-router-dom";
import { Button } from "@mui/material";

import styles from "./Header.module.scss";

const Header = () => {
  const isLoggedIn = true;
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerContainer}>
          <p>Hello, John!</p>
          <Button variant="outlined">
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
