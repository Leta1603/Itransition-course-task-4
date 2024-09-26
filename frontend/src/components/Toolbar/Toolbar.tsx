import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";

import styles from "./toolbar.module.scss";
import { useSelector } from "react-redux";
import { UserSelectors } from "../../redux/reducers/userSlice.ts";

const Toolbar = () => {
  const selectedUsers = useSelector(UserSelectors.getSelectedUsers);
  const onBlockClick = () => {
    console.log(selectedUsers);
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
      <Button variant="outlined">
        <LockOpenIcon />
      </Button>
      <Button variant="contained" color="error">
        <DeleteIcon />
      </Button>
    </div>
  );
};

export default Toolbar;
