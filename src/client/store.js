/**
 * @flow
 */

import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import createLogger from "redux-logger";
import reducers from "./reducers";
import saga from "./sagas";

// action logger
const loggerMiddleware = createLogger();

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducers,
    applyMiddleware(thunkMiddleware, sagaMiddleware, loggerMiddleware)
  );
  sagaMiddleware.run(saga);
  return store;
}
