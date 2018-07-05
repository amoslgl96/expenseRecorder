import { createStore, combineReducers, applyMiddleware } from 'redux';
//third party libs should be placed at the top 
import thunk from 'redux-thunk';

import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';


//window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ -> redux_devtool way of 
//doing composing.
const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer,
      auth: authReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};


//to apply redux-thunk, we use compose to combine thunk and redux_devtool tgt 
//to provide their functionalities to redux-store.