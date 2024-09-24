import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../@type.ts";
import { RootState } from "../store.ts";

type InitialState = {
  users: UserInfo[];
};

const initialState: InitialState = {
  users: [],
};

const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserInfo[]>) => {
      state.users = action.payload;
    },
    getUsers: (_, __: PayloadAction<undefined>) => {},
  },
});

export const { setUsers, getUsers } = userSlice.actions;

export const UserSelectors = {
  getUsers: (state: RootState) => state.userReducer.users,
};

export default userSlice.reducer;
