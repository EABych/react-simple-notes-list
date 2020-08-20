import { userConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.ADD_NODE_SUCCESS:
    case userConstants.EDIT_NODE_SUCCESS:
    case userConstants.DELETE_NODE_SUCCESS:
      return {
        loggedIn: true,
        user: action.payload,
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
    return {
      loggedIn: false,
      user: {},
    };
    default:
      return state
  }
}