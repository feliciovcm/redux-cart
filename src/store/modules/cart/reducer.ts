import { Reducer } from "redux";
import { ActionTypes, IAction, ICartState } from "./types";

const INITIAL_STATE: ICartState = { items: [], failedStockCheck: [] };

const cart: Reducer<ICartState | undefined, IAction> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.addProductToCartSuccess: {
      const { product } = action.payload;

      const productInCartIndex = state.items.findIndex(item => item.product.id === product.id);

      if (productInCartIndex >= 0) {
        const newItems = [...state.items]
        newItems[productInCartIndex].quantity++;
        return {
          ...state,
          items: [...newItems]
        }
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            product,
            quantity: 1
          }
        ]
      };
    }
    case ActionTypes.addProductToCartFailure: {
      return {
        ...state,
        failedStockCheck: [
          ...state.failedStockCheck,
          action.payload.productId
        ]
      }
    }

    default: {
      return state
    }
  }
}

export default cart;
