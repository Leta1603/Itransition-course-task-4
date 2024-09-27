import { create } from "apisauce";
import {
  ChangeStatusData,
  UserInfoRequest,
  UserSignInData,
} from "../../redux/@type.ts";

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

const changeStatus = (data: ChangeStatusData) => {
  return API.patch("/user/update-status", data);
};

export default {
  getUsers,
  signUpUser,
  signInUser,
  changeStatus,
};
