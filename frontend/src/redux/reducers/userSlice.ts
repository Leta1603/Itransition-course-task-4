import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ChangeStatusPayload,
  DeleteUsersPayload,
  UserInfoPayload,
  UserInfoResponse,
  UserSignInPayload,
} from "../@type.ts";
import { RootState } from "../store.ts";
import { GridRowId } from "@mui/x-data-grid";
import { useUserInfo } from "../../hooks";

type InitialState = {
  users: UserInfoResponse[];
  user: UserInfoResponse | null;
  selectedUsers: GridRowId[];
  btnFlag: boolean;
  isUserLoggedIn: boolean;
};

const initialState: InitialState = {
  users: [],
  user: useUserInfo().getUserInfo(),
  selectedUsers: [],
  btnFlag: false,
  isUserLoggedIn: !!useUserInfo().getUserInfo(),
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
      state.isUserLoggedIn = !!action.payload;
    },
    signUpUser: (_, __: PayloadAction<UserInfoPayload>) => {},
    signInUser: (_, __: PayloadAction<UserSignInPayload>) => {},
    deleteUsers: (state, __: PayloadAction<DeleteUsersPayload>) => {
      state.btnFlag = !state.btnFlag;
    },
    setSelectedUsers: (state, action: PayloadAction<GridRowId[]>) => {
      state.selectedUsers = action.payload;
    },
    changeStatusOfUsers: (state, __: PayloadAction<ChangeStatusPayload>) => {
      state.btnFlag = !state.btnFlag;
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
  changeStatusOfUsers,
  deleteUsers,
} = userSlice.actions;

export const UserSelectors = {
  getUsers: (state: RootState) => state.userReducer.users,
  getUserIsLoggedIn: (state: RootState) => state.userReducer.isUserLoggedIn,
  getSelectedUsers: (state: RootState) => state.userReducer.selectedUsers,
  getBtnFlag: (state: RootState) => state.userReducer.btnFlag,
};

export default userSlice.reducer;
