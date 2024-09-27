import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ChangeStatusPayload,
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
  btnFlag: boolean;
};

const initialState: InitialState = {
  users: [],
  user: null,
  selectedUsers: [],
  btnFlag: false,
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
} = userSlice.actions;

export const UserSelectors = {
  getUsers: (state: RootState) => state.userReducer.users,
  getSelectedUsers: (state: RootState) => state.userReducer.selectedUsers,
  getBtnFlag: (state: RootState) => state.userReducer.btnFlag,
};

export default userSlice.reducer;
