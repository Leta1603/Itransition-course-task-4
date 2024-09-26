import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  UserInfoPayload,
  UserInfoResponse,
  UserSignInPayload,
} from "../@type.ts";
import { RootState } from "../store.ts";
import { GridRowId } from "@mui/x-data-grid";

type InitialState = {
  users: UserInfoResponse[];
  user: UserInfoResponse | null;
  selectedUsers: GridRowId[];
};

const initialState: InitialState = {
  users: [],
  user: null,
  selectedUsers: [],
};

const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserInfoResponse[]>) => {
      state.users = action.payload;
    },
    getUsers: (_, __: PayloadAction<undefined>) => {},
    setUser: (state, action: PayloadAction<UserInfoResponse | null>) => {
      state.user = action.payload;
    },
    signUpUser: (_, __: PayloadAction<UserInfoPayload>) => {},
    signInUser: (_, __: PayloadAction<UserSignInPayload>) => {},
    setSelectedUsers: (state, action: PayloadAction<GridRowId[]>) => {
      state.selectedUsers = action.payload;
    },
  },
});

export const {
  setUsers,
  getUsers,
  signUpUser,
  setUser,
  signInUser,
  setSelectedUsers,
} = userSlice.actions;

export const UserSelectors = {
  getUsers: (state: RootState) => state.userReducer.users,
  getSelectedUsers: (state: RootState) => state.userReducer.selectedUsers,
};

export default userSlice.reducer;
