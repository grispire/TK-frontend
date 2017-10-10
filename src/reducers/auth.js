import {
  SIGNUP_STARTED,
  SIGNUP_SUCCESSFUL,
  SIGNUP_FAILED,
  LOGIN_STARTED,
  LOGIN_SUCCESSFUL,
  LOGIN_FAILED,
} from '../actions/auth';

const LOG_OUT = 'LOG_OUT';

const initialState = {
  authInProgress: false,
  loggedIn: false,
  signUpError: '',
  loginError: '',
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    // SIGNUP_STARTED & LOGIN_STARTED принимают и выдают одинаковые данные
    case SIGNUP_STARTED:
      return {
        ...state,
        login: action.login,
        password: action.password,
        loginError: '',
        signUpError: '',
        authInProgress: action.authInProgress,
      };

    case LOGIN_STARTED:
      return {
        ...state,
        login: action.login,
        password: action.password,
        loginError: '',
        signUpError: '',
        authInProgress: action.authInProgress,
      };
    case SIGNUP_SUCCESSFUL:
      return {
        ...state,
        login: action.login,
        password: action.password,
        loginError: '',
        signUpError: '',
        authInProgress: action.authInProgress,
      };
    case LOGIN_SUCCESSFUL:
      return {
        ...state,
        login: action.login,
        password: action.password,
        loginError: '',
        signUpError: '',
        sid: action.sid,
        authInProgress: action.authInProgress,
        loggedIn: true,
      };
    case SIGNUP_FAILED:
      return {
        ...state,
        login: action.login,
        password: action.password,
        signUpError: action.error,
        authInProgress: action.authInProgress,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        login: action.login,
        password: action.password,
        loginError: action.error,
        authInProgress: action.authInProgress,
      };
    case LOG_OUT:
      return {
        ...state,
        login: null,
        password: null,
        sid: null,
        loggedIn: false,
      };
    default:
      return state;
  }
}
