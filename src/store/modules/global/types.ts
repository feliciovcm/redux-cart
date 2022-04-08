export enum ActionTypes {
  onLoginRequest = "ON_LOGIN_REQUEST",
  onLoginSuccess = "ON_LOGIN_SUCCESS",
  onLogout = "ON_LOGOUT",
  getProfileSuccess= "GET_PROFILE_SUCCESS"
};

export interface IGlobalState {
  user: {
    name: string;
    email: string;
  };
  profile: {
    name: string;
    email: string;
    id: string;
    avatar: string;
    driver_license: string;
    created_at: string;
    avatar_url: string;
  }
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string
  user: User
  refresh_token: string
}

export interface User {
  name: string
  email: string
}

