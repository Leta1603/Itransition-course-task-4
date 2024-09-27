import { GridRowId } from "@mui/x-data-grid";

export type PayloadWithDataAndCallback<Data> = {
  data: Data;
  callback: () => void;
  //   функция, котора выполняется, если создание успешно
};

// id: number;
// fullName: string;
// email: string;
// lastLoginTime: string;
// registrationTime: string;
// status: string;
// salt: string;
// password: string;

export type UserInfoResponse = {
  id?: number;
  fullName?: string;
  email?: string;
  status?: string;
  lastLoginTime?: string;
};

export type UserInfoRequest = {
  fullName: string;
  email: string;
  lastLoginTime: string;
  registrationTime: string;
  status: string;
  salt: string;
  password: string;
};

export type UserInfoPayload = PayloadWithDataAndCallback<UserInfoRequest>;

export type UserSignInData = {
  email: string;
  password: string;
  lastLoginTime: string;
};

export type UserSignInPayload = PayloadWithDataAndCallback<UserSignInData>;

export type ChangeStatusData = {
  ids: GridRowId[];
  status: string;
};

export type ChangeStatusPayload = PayloadWithDataAndCallback<ChangeStatusData>;
