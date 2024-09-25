import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import SignUp from "./pages/SignUp/SignUp.tsx";

function App() {

  return (
    <>
      <SignUp />
      <ToastContainer />
    </>
  );
}

export default App;
