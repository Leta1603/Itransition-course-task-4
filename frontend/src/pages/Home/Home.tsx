import Table from "../../components/Table";
import Toolbar from "../../components/Toolbar";

import styles from "./Home.module.scss";

const Home = () => {
  return (
    <div className={styles.wrapper}>
      <Toolbar />
      <Table />
    </div>
  );
};

export default Home;
