import { UserInfoResponse } from "../redux/@type.ts";

const useUserInfo = () => {
  const getUserInfo = () => {
    const storedData = localStorage.getItem("userInfo");
    const userInfo: UserInfoResponse = storedData && JSON.parse(storedData);
    return userInfo;
  };

  return { getUserInfo };
};

export default useUserInfo;
