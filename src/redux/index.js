import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import account from './account';

export default createStore(
  combineReducers({
    account,
    form: formReducer,
  }),
  applyMiddleware(thunk),
);
