import { createStore, combineReducers, applyMiddleware } from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import thunk from 'redux-thunk';

//window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ -> redux_devtool way of 
//doing composing.
const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};


//to apply redux-thunk, we use compose to combine thunk and redux_devtool tgt 
//to provide their functionalities to redux-store.