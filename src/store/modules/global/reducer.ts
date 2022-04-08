import { Reducer } from "redux";
import { ActionTypes, IGlobalState } from "./types";

const initialUser = localStorage.getItem('@redux:user');

const INITIAL_STATE: IGlobalState = {
  user: initialUser ? JSON.parse(initialUser) : null,
  profile: {
    avatar: '',
    avatar_url:'',
    created_at: '',
    driver_license: '',
    email: '',
    id: '',
    name: ''
  },
};

const authetication: Reducer<IGlobalState | undefined> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.onLoginSuccess:
      localStorage.setItem('@redux:user', JSON.stringify(action.payload.user))
      localStorage.setItem('@redux:token', JSON.stringify(action.payload.token))
      localStorage.setItem('@redux:refreshToken', JSON.stringify(action.payload.refresh_token))
      return {
        ...state,
        user: {
          ...action.payload.user
        }
      }

    case ActionTypes.onLogout:
      localStorage.removeItem('@redux:user');
      localStorage.removeItem('@redux:token');
      localStorage.removeItem('@redux:refreshToken');
      return {
        ...state,
        user: null
      }

    case ActionTypes.getProfileSuccess:
      return {
        ...state,
        profile: {
          ...action.payload.profile
        }
      }

    default:
      return state;
  }
}

export default authetication;

