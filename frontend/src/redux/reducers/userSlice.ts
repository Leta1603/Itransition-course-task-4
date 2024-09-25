import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {UserInfoPayload, UserInfoRequest, UserInfoResponse} from "../@type.ts";
import { RootState } from "../store.ts";

type InitialState = {
  users: UserInfoResponse[];
  user: UserInfoRequest | null;
};

const initialState: InitialState = {
  users: [],
  user: null,
};

const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserInfoResponse[]>) => {
      state.users = action.payload;
    },
    getUsers: (_, __: PayloadAction<undefined>) => {},
    // setUser: (state, action: PayloadAction<UserInfoRequest | null>) => {
    //   state.user = action.payload;
    // },
    signUpUser: (_, __: PayloadAction<UserInfoPayload>) => {},
  },
});

export const { setUsers, getUsers, signUpUser } = userSlice.actions;

export const UserSelectors = {
  getUsers: (state: RootState) => state.userReducer.users,
};

export default userSlice.reducer;
