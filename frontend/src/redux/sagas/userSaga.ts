import { all, takeLatest, call, put } from "redux-saga/effects";
import {
  changeStatusOfUsers,
  getUsers,
  setUser,
  setUsers,
  signInUser,
  signUpUser,
} from "../reducers/userSlice.ts";
import { ApiResponse } from "apisauce";

import API from "../../utils/api/index.ts";
import {
  ChangeStatusPayload,
  UserInfoPayload,
  UserInfoResponse,
  UserSignInPayload,
} from "../@type.ts";
import { PayloadAction } from "@reduxjs/toolkit";
// @ts-ignore
import { toast } from "react-toastify";

function* getUsersWorker() {
  const response: ApiResponse<UserInfoResponse[]> = yield call(API.getUsers);
  if (response.ok && response.data) {
    yield put(setUsers(response.data));
  } else {
    console.error("Get users error", response.problem);
  }
}

function* signUpUserWorker(action: PayloadAction<UserInfoPayload>) {
  const { data, callback } = action.payload;
  const response: ApiResponse<undefined> = yield call(API.signUpUser, data);
  if (response.ok) {
    // @ts-ignore
    if (response.data.message) {
      toast.error("User already exists", { delay: 200 });
    } else {
      toast.success("You have successfully registered", { delay: 200 });
      callback();
    }
  } else {
    console.error("Sign up user error", response.problem);
  }
}

function* signInUserWorker(action: PayloadAction<UserSignInPayload>) {
  const { data, callback } = action.payload;
  const response: ApiResponse<UserInfoResponse> = yield call(
    API.signInUser,
    data,
  );
  if (response.ok && response.data) {
    if (response.data.status === "Active") {
      yield put(setUser(response.data));
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      callback();
    } else {
      toast.error("The user is blocked", { delay: 200 });
    }
  } else {
    console.error("Sign in user error", response.problem);
  }
}

function* changeStatusOfUsersWorker(
  action: PayloadAction<ChangeStatusPayload>,
) {
  const { data, callback } = action.payload;
  const response: ApiResponse<undefined> = yield call(API.changeStatus, data);
  if (response.ok) {
    callback();
  } else {
    console.error("Change status of users error", response.problem);
  }
}

export default function* userSaga() {
  yield all([
    takeLatest(getUsers, getUsersWorker),
    takeLatest(signUpUser, signUpUserWorker),
    takeLatest(signInUser, signInUserWorker),
    takeLatest(changeStatusOfUsers, changeStatusOfUsersWorker),
  ]);
}
