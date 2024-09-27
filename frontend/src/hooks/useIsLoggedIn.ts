import { UserInfoResponse } from "../redux/@type.ts";

const useIsLoggedIn = () => {
  const isLoggedIn = () => {
    const storedData = localStorage.getItem("userInfo");
    const userInfo: UserInfoResponse = storedData && JSON.parse(storedData);
    return !!userInfo;
  };

  return { isLoggedIn };
};

export default useIsLoggedIn;
