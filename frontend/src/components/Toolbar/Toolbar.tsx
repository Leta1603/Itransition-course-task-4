import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeStatusOfUsers,
  setUser,
  UserSelectors,
} from "../../redux/reducers/userSlice.ts";
import { RoutesList } from "../../pages/Router.tsx";
import { useUserInfo } from "../../hooks";

import styles from "./toolbar.module.scss";

const Toolbar = () => {
  const selectedIds = useSelector(UserSelectors.getSelectedUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useUserInfo().getUserInfo();

  const onBlockClick = () => {
    if (selectedIds.length > 0) {
      dispatch(
        changeStatusOfUsers({
          data: { ids: selectedIds, status: "Blocked" },
          callback: () => {
              selectedIds.forEach((id) => {
                if (userInfo.id === id){
                    localStorage.setItem("userInfo", JSON.stringify(null));
                    dispatch(setUser(null));
                    navigate(RoutesList.SignIn);
                }
            });
          },
        }),
      );
    }
  };

  const onUnblockClick = () => {
    if (selectedIds.length > 0) {
      dispatch(
        changeStatusOfUsers({
          data: { ids: selectedIds, status: "Active" },
          callback: () => {},
        }),
      );
    }
  };

  return (
    <div className={styles.container}>
      <Button
        variant="contained"
        startIcon={<LockIcon />}
        onClick={onBlockClick}
      >
        Block
      </Button>
      <Button variant="outlined" onClick={onUnblockClick}>
        <LockOpenIcon />
      </Button>
      <Button variant="contained" color="error">
        <DeleteIcon />
      </Button>
    </div>
  );
};

export default Toolbar;
