import { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { loginApi } from "../../../services/api";
import { getProfileSuccess, onUserLogout } from "./actions";
import { ActionTypes } from "./types";

export interface IProfileResponse {
  name: string
  email: string
  id: string
  avatar: string
  driver_license: string
  created_at: string
  avatar_url: string
}


function* onUserLogin() {
  const token = JSON.parse(localStorage.getItem("@redux:token") ?? "{}");
  try {
    const {data}: AxiosResponse<IProfileResponse> = yield call(loginApi.get, '/account', {headers: {
      Authorization: `Bearer ${token}`
    }});
    yield put(getProfileSuccess(data))
  } catch (error) {
    yield put(onUserLogout())
  }
}

export default all([
  takeLatest(ActionTypes.onLoginRequest, onUserLogin)
]);
