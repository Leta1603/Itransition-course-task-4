import { all, takeLatest, call, put } from "redux-saga/effects";
import { getUsers, setUsers } from "../reducers/userSlice.ts";
import { ApiResponse } from "apisauce";

import API from "../../utils/api/index.ts";
import { UserInfo } from "../@type.ts";

function* getUsersWorker() {
  const response: ApiResponse<UserInfo[]> = yield call(API.getUsers);
  if (response.ok && response.data) {
    yield put(setUsers(response.data));
  } else {
    console.error("Get users error", response.problem);
  }
}

export default function* userSaga() {
  yield all([takeLatest(getUsers, getUsersWorker)]);
}
