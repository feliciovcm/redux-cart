import { AxiosResponse } from "axios";
import { ILoginResponse } from "../store/modules/global/types";

import { loginApi } from "./api";

interface ICreateUser {
  email: string;
  password: string;
  name: string;
  username: string;
};

async function signInWIthEmailAndPassword(email: string, password: string) {
  const user: AxiosResponse<ILoginResponse> = await loginApi.post('/login', { email, password })

  return user
}

async function createUserWIthEmailAndPassword(user: ICreateUser) {
  const userCreated: AxiosResponse<any> = await loginApi.post('/account', user)

  return userCreated;
}

async function logout() {
  localStorage.removeItem('@redux:user');
  localStorage.removeItem('@redux:token');
  localStorage.removeItem('@redux:refreshToken');
}

export { signInWIthEmailAndPassword, createUserWIthEmailAndPassword, logout }
