import { all } from "redux-saga/effects";
import userSaga from "./userSaga.ts";

export default function* rootSaga() {
    yield all([userSaga()]);
}