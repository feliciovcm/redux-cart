import { IProfileResponse } from "./sagas"
import { ActionTypes, ILoginResponse } from "./types"

export function loginRequest() {
  return {
    type: ActionTypes.onLoginRequest,
  }
}

export function loginSuccess(user: ILoginResponse) {
  return {
    type: ActionTypes.onLoginSuccess,
    payload: user
  }
}

export function onUserLogout() {
  return {
    type: ActionTypes.onLogout,
  }
}

export function getProfileSuccess(profile: IProfileResponse) {
  return {
    type: ActionTypes.getProfileSuccess,
    payload: profile
  }
}
