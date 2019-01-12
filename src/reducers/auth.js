import * as actionTypes from '../constants/actionTypes';
import { AsyncStorage } from 'react-native';

function auth(state = {}, action) {
  switch (action.type) {
    case actionTypes.LOG_OUT:
      return {};
    case actionTypes.SET_LOGIN_ERROR:
      return {
        loginError: action.message,
        registerError: undefined,
      };
    case actionTypes.SET_REGISTER_ERROR:
      return {
        registerError: action.message,
        loginError: undefined,
      };
    case actionTypes.POST_LOGIN:
      return {
        ...state,
        username: action.username,
        token: action.token,
        userId: action.userId,
        loggedIn: true,
        registerError: undefined,
        loginError: undefined,
      };
    default:
      return state;
  }
}

export default auth;
