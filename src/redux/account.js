import Cookies from 'js-cookie';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_REQUEST = 'FETCH_REQUEST'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const FETCH_FAILURE = 'FETCH_FAILURE'
export const FETCH_ACCOUNT_LIST = 'FETCH_ACCOUNT_LIST'
export const FETCH_ACCOUNT_DETAIL = 'FETCH_ACCOUNT_DETAIL'
export const SHOW_INVALID_CREDENTIAL = 'SHOW_INVALID_CREDENTIAL'
export const HIDE_INVALID_CREDENTIAL = 'HIDE_INVALID_CREDENTIAL'
export const SHOW_SIGN_UP_SUCCESS = 'SHOW_SIGN_UP_SUCCESS'
export const HIDE_SIGN_UP_SUCCESS = 'HIDE_SIGN_UP_SUCCESS'
export const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS'
export const HIDE_LOGIN_SUCCESS = 'HIDE_LOGIN_SUCCESS'
export const SHOW_ACCOUNT_UPDATE_SUCCESS = 'SHOW_ACCOUNT_UPDATE_SUCCESS'
export const HIDE_ACCOUNT_UPDATE_SUCCESS = 'HIDE_ACCOUNT_UPDATE_SUCCESS'
export const REMOVE_ACCOUNT_INFO = 'REMOVE_ACCOUNT_INFO'

// ------------------------------------
// Actions
// ------------------------------------
function fetchRequest () {
  return {
    type: FETCH_REQUEST
  }
}

function fetchFailure (error) {
  return {
    type: FETCH_FAILURE,
    error
  }
}

function fetchAccountList (data) {
  return {
    type: FETCH_ACCOUNT_LIST,
    data
  }
}

function fetchAccountDetail (id, accountDetail) {
  return {
    type: FETCH_ACCOUNT_DETAIL,
    id,
    accountDetail
  }
}

function showInvalidCredential () {
  return {
    type: SHOW_INVALID_CREDENTIAL
  }
}

function hideInvalidCredential () {
  return {
    type: HIDE_INVALID_CREDENTIAL
  }
}

function showSignUpSuccess () {
  return {
    type: SHOW_SIGN_UP_SUCCESS
  }
}

function hideSignUpSuccess () {
  return {
    type: HIDE_SIGN_UP_SUCCESS
  }
}

function setLoginSuccess (accountInfo) {
  return {
    type: SET_LOGIN_SUCCESS,
    accountInfo
  }
}

function hideLoginSuccess () {
  return {
    type: HIDE_LOGIN_SUCCESS
  }
}

function showAccountUpdateSuccess () {
  return {
    type: SHOW_ACCOUNT_UPDATE_SUCCESS
  }
}

function hideAccountUpdateSuccess () {
  return {
    type: HIDE_ACCOUNT_UPDATE_SUCCESS
  }
}

function removeAccountInfo () {
  return {
    type: REMOVE_ACCOUNT_INFO
  }
}

export function signUp (data) {
  return (dispatch, getState) => {
    dispatch(fetchRequest())

    return fetch('/api/account', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      if (response.status === 200) {
        // Todo: push 처리
        // dispatch(push('/'))
        dispatch(showSignUpSuccess())
        setTimeout(() => dispatch(hideSignUpSuccess()), 3000)
      }
      if (response.status === 409) {
        dispatch(showInvalidCredential())
        setTimeout(() => dispatch(hideInvalidCredential()), 2000)
      }
    }, function (error) {
      dispatch(fetchFailure(error))
    })
  }
}

export function login (data) {
  return (dispatch) => {
    dispatch(fetchRequest())

    return fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      if (response.status === 200) {
        response.text().then((data) => {
          data = JSON.parse(data)
          Cookies.set('accountInfo', data, { path: '/' })
          // dispatch(push('/'))
          dispatch(setLoginSuccess(data))
          setTimeout(() => dispatch(hideLoginSuccess()), 3000)
        })
      }
      if (response.status === 401) {
        dispatch(showInvalidCredential())
        setTimeout(() => dispatch(hideInvalidCredential()), 2000)
      }
    }, function (error) {
      dispatch(fetchFailure(error))
    })
  }
}

export function logout () {
  return (dispatch) => {
    Cookies.remove('accountInfo', { path: '/' })
    dispatch(removeAccountInfo())
  }
}

export function updateAccountList () {
  return (dispatch) => {
    dispatch(fetchRequest())

    return fetch('/api/account_list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      if (response.status === 200) {
        response.text().then((data) => {
          dispatch(fetchAccountList(JSON.parse(data)))
        })
      }
    }, function (error) {
      dispatch(fetchFailure(error))
    })
  }
}

export function redirectToAccountSettingForm (id) {
  return (dispatch) => {
    // dispatch(push('/account/' + id))
  }
}

export function getAccountById (id) {
  return (dispatch) => {
    dispatch(fetchRequest())

    return fetch('/api/account/' + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      if (response.status === 200) {
        response.text().then((data) => {
          dispatch(fetchAccountDetail(id, JSON.parse(data)))
        })
      }
    }, function (error) {
      dispatch(fetchFailure(error))
    })
  }
}

export function updateAccount (accountDetail) {
  return (dispatch) => {
    dispatch(fetchRequest())

    return fetch('/api/account', {
      method: 'PUT',
      body: JSON.stringify(accountDetail),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      if (response.status === 200) {
        // dispatch(push('/admin'))
        dispatch(updateAccountList())
        dispatch(showAccountUpdateSuccess())
        setTimeout(() => dispatch(hideAccountUpdateSuccess()), 3000)
      }
    }, function (error) {
      dispatch(fetchFailure(error))
    })
  }
}

export const actions = {
  signUp,
  login,
  updateAccountList,
  redirectToAccountSettingForm,
  getAccountById,
  updateAccount
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_REQUEST]: (state, action) => {
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false
    })
  },
  [FETCH_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false
    })
  },
  [FETCH_FAILURE]: (state, action) => {
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: true
    })
  },
  [FETCH_ACCOUNT_LIST]: (state, action) => {
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      accounts: action.data
    })
  },
  [FETCH_ACCOUNT_DETAIL]: (state, action) => {
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      accountDetails: Object.assign({}, state.accountDetails, {[action.id]: action.accountDetail})
    })
  },
  [SHOW_INVALID_CREDENTIAL]: (state, action) => {
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      showInvalidCredential: true
    })
  },
  [HIDE_INVALID_CREDENTIAL]: (state, action) => {
    return Object.assign({}, state, {
      showInvalidCredential: false
    })
  },
  [SHOW_SIGN_UP_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      showSignUpSuccess: true
    })
  },
  [HIDE_SIGN_UP_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      showSignUpSuccess: false
    })
  },
  [SET_LOGIN_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      showLoginSuccess: true,
      accountInfo: action.accountInfo
    })
  },
  [HIDE_LOGIN_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      showLoginSuccess: false
    })
  },
  [SHOW_ACCOUNT_UPDATE_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      showAccountUpdateSuccess: true
    })
  },
  [HIDE_ACCOUNT_UPDATE_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      showAccountUpdateSuccess: false
    })
  },
  [REMOVE_ACCOUNT_INFO]: (state, action) => {
    return Object.assign({}, state, {
      accountInfo: null
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching: false,
  didInvalidate: false,
  showInvalidCredential: false,
  showSignUpSuccess: false,
  showLoginSuccess: false,
  showAccountUpdateSuccess: false,
  accountInfo: Cookies.get('accountInfo'),
  accounts: [],
  accountDetails: {}
}

export default function accountReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
