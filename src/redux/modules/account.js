/* @flow */
import fetch from 'isomorphic-fetch'
// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_REQUEST = 'FETCH_REQUEST'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const FETCH_FAILURE = 'FETCH_FAILURE'
export const FETCH_ACCOUNT_LIST = 'FETCH_ACCOUNT_LIST'

// ------------------------------------
// Actions
// ------------------------------------
function fetchRequest () {
  return {
    type: FETCH_REQUEST
  }
}

function fetchSuccess () {
  return {
    type: FETCH_SUCCESS
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

export function signUp (data) {
  return (dispatch) => {
    dispatch(fetchRequest())

    return fetch('/api/account', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      if (response.status === 200) {
        dispatch(fetchSuccess())
        location.href = '/?dialog=sign_up_success'
      }
    }, function (error) {
      dispatch(fetchFailure(error))
    })
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

export const actions = {
  signUp,
  updateAccountList
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
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching: false,
  didInvalidate: false,
  accounts: []
}

export default function accountReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
