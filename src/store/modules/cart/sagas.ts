import { AxiosResponse } from "axios";
import { all, select, takeLatest, call, put } from "redux-saga/effects";
import { IState } from "../..";
import api from "../../../services/api";
import { addProductToCartFailure, addProductToCartRequest, addProductToCartSuccess } from "./actions";
import { ActionTypes } from "./types";

type CheckProductStockType = ReturnType<typeof addProductToCartRequest>;

interface IStockResponse {
  id: number;
  quantity: number;
}

function* checkProductStock({ payload }: CheckProductStockType) {
  const { product } = payload;

  // select is used to get info from the state
  const currentQuantity: number = yield select((state: IState) => {
    return state.cart.items.find(item => item.product.id === product.id)?.quantity ?? 0;
  })
  // to make api calls inside saga we need to use the call method from saga, passing the api method
  // in the first parameter and the route in the second
  const availabiltyStockResponse: AxiosResponse<IStockResponse> = yield call(api.get, `stock/${product.id}`)

  if (availabiltyStockResponse.data.quantity > currentQuantity) {
    // in order to trigger an action inside saga we need to use the put method from saga effects
    yield put(addProductToCartSuccess(product))
  } else {
    yield put(addProductToCartFailure(product.id))
  }
}

// takelatest is used in case user trigger an action many times in a row, and
// the function checkproduct still did not finish, it will cancel the execution before and
// execute only the latest action
export default all([
  takeLatest(ActionTypes.addProductToCartRequest, checkProductStock)
]);