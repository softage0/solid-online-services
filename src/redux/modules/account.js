/* @flow */
import fetch from 'isomorphic-fetch'
// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_REQUEST = 'FETCH_REQUEST'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const FETCH_FAILURE = 'FETCH_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
function signUpRequest (data) {
  return {
    type: FETCH_REQUEST,
    data
  }
}

function signUpSuccess () {
  return {
    type: FETCH_SUCCESS
  }
}

function signUpFailure (error) {
  return {
    type: FETCH_FAILURE,
    error
  }
}

export function signUp (data) {
  return (dispatch) => {
    dispatch(signUpRequest(data))

    return fetch('/api/account', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      if (response.status === 200) {
        dispatch(signUpSuccess())
        location.href = '/?dialog=sign_up_success'
      }
    }, function (error) {
      dispatch(signUpFailure(error))
    })
  }
}

export function accountList (data) {
  return (dispatch) => {
    dispatch(signUpRequest(data))

    return fetch('/api/account', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      if (response.status === 200) {
        dispatch(signUpSuccess())
      }
    }, function (error) {
      dispatch(signUpFailure(error))
    })
  }
}

export const actions = {
  signUp
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
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: []
}

export default function accountReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
