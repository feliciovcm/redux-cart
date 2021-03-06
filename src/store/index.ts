import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ICartState } from './modules/cart/types';
import rootReducer from './modules/rootReducer';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './modules/rootSaga';
import { IGlobalState } from './modules/global/types';

export interface IState {
  cart: ICartState;
  authetication: IGlobalState;
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

// create store, passing as parameter the reducers combined in our rootReducer
const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(...middlewares)
));

sagaMiddleware.run(rootSaga);

export default store


// const store = createStore(() => ({
//   cart,
// }));
// Doing like that the return will be a object with a cart: func
