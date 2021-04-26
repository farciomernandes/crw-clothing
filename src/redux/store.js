import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';

//This file is all different data together on a router.
import rootReducer from './root-reducer';

//This file is used to log all reducers and log methods from your redux.
const middlewares = [];

//This line checks if your project is under development. If so, it adds logger to the miidleware.
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

//Create the Store with all data of your app.
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);