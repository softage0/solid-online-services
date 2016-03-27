import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import account from './modules/account'

export default combineReducers({
  router,
  form: formReducer,
  account
})
