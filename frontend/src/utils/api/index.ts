import { create } from "apisauce";
import { UserInfoRequest } from "../../redux/@type.ts";

const API = create({
  baseURL: "http://localhost:8800",
});

const getUsers = () => {
  return API.get("/users");
};

const signUpUser = (data: UserInfoRequest) => {
  return API.post("/users", data);
};

export default {
  getUsers,
  signUpUser,
};
