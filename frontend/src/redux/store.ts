import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice.ts";

import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSaga.ts";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export default store;
