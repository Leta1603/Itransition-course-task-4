import { all, takeLatest, call, put } from "redux-saga/effects";
import { getUsers, setUsers, signUpUser } from "../reducers/userSlice.ts";
import { ApiResponse } from "apisauce";

import API from "../../utils/api/index.ts";
import { UserInfoPayload, UserInfoResponse } from "../@type.ts";
import { PayloadAction } from "@reduxjs/toolkit";
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
    if (response.data.message) {
      toast.error("User already exists", { delay: 200 });
    } else {
      callback();
    }
  } else {
    console.error("Sign up user error", response.problem);
  }
}

export default function* userSaga() {
  yield all([
    takeLatest(getUsers, getUsersWorker),
    takeLatest(signUpUser, signUpUserWorker),
  ]);
}
