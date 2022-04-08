export enum ActionTypes {
  addProductToCartRequest = "ADD_PRODUCT_TO_CART_REQUEST",
  addProductToCartFailure = "ADD_PRODUCT_TO_CART_FAILURE",
  addProductToCartSuccess = "ADD_PRODUCT_TO_CART_SUCCESS"
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export interface ICartState {
  items: ICartItem[]
  failedStockCheck: number[];
}

export interface IAction {
  type: string;
  payload: any;
}
