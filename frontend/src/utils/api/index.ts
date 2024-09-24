import { create } from "apisauce";

const API = create({
  baseURL: "http://localhost:8800",
});

const getUsers = () => {
  return API.get("/users");
};

export default {
  getUsers,
};
