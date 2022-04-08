import { combineReducers } from "redux";
import cart from './cart/reducer';
import authetication from "./global/reducer";

export default combineReducers({
  cart,
  authetication
})
