/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
export const SIGN_UP = 'SIGN_UP'

let keyCount = 1

// ------------------------------------
// Actions
// ------------------------------------
// NOTE: "Action" is a Flow interface defined in https://github.com/TechnologyAdvice/flow-interfaces
// If you're unfamiliar with Flow, you are completely welcome to avoid annotating your code, but
// if you'd like to learn more you can check out: flowtype.org.
// DOUBLE NOTE: there is currently a bug with babel-eslint where a `space-infix-ops` error is
// incorrectly thrown when using arrow functions, hence the oddity.
export function signUp (value): Object {
  keyCount += 1
  return {
    type: SIGN_UP,
    data: {key: keyCount, ...value}
  }
}

// This is a thunk, meaning it is a function that immediately
// returns a function for lazy evaluation. It is incredibly useful for
// creating async actions, especially when combined with redux-thunk!
// NOTE: This is solely for demonstration purposes. In a real application,
// you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
// reducer take care of this logic.
export const doubleAsync = (): Function => {
  return (dispatch: Function, getState: Function): Promise => {
    return new Promise((resolve: Function): void => {
      setTimeout(() => {
        dispatch(signUp(getState().counter))
        resolve()
      }, 200)
    })
  }
}

export const actions = {
  signUp,
  doubleAsync
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SIGN_UP]: (state: Object, action: {data: Object}): Object => {
    $.ajax({
      url: 'account.json',
      dataType: 'json',
      type: 'POST',
      data: action.data,
      success: function (res) {
        console.log(res)
        return Object.assign({}, state, action.data)
      },
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString())
        return state
      }
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function accountReducer (state: Object = initialState, action: Action): Object {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
