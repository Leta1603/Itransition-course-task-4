export type PayloadWithDataAndCallback<Data> = {
  data: Data;
  callback: () => void;
  //   функция, котора выполняется, если создание успешно
};

export type UserInfoResponse = {
  id: number;
  fullName: string;
  email: string;
  lastLoginTime: string;
  registrationTime: string;
  status: string;
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
