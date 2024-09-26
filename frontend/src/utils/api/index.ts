import { create } from "apisauce";
import {UserInfoRequest, UserSignInData} from "../../redux/@type.ts";

const API = create({
  baseURL: "http://localhost:8800",
});

const getUsers = () => {
  return API.get("/users");
};

const signUpUser = (data: UserInfoRequest) => {
  return API.post("/user/create", data);
};

const signInUser = (data: UserSignInData) => {
  return API.post("/user/login", data);
};

export default {
  getUsers,
  signUpUser,
  signInUser
};
