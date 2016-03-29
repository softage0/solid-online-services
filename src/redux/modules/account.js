/* @flow */
import fetch from 'isomorphic-fetch'
// ------------------------------------
// Constants
// ------------------------------------
export const POST_SIGN_UP_REQUEST = 'POST_SIGN_UP_REQUEST'
export const POST_SIGN_UP_SUCCESS = 'POST_SIGN_UP_SUCCESS'
export const POST_SIGN_UP_FAILURE = 'POST_SIGN_UP_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
function signUpRequest (data) {
  return {
    type: POST_SIGN_UP_REQUEST,
    data
  }
}

function signUpSuccess () {
  return {
    type: POST_SIGN_UP_SUCCESS
  }
}

function signUpFailure (error) {
  return {
    type: POST_SIGN_UP_FAILURE,
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
  [POST_SIGN_UP_REQUEST]: (state, action) => {
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false
    })
  },
  [POST_SIGN_UP_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false
    })
  },
  [POST_SIGN_UP_FAILURE]: (state, action) => {
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
