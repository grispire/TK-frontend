export const SIGNUP_STARTED = 'SIGNUP_STARTED';
export const SIGNUP_SUCCESSFUL = 'SIGNUP_SUCCESSFUL';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';
export const LOGIN_STARTED = 'LOGIN_STARTED';
export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const signupStarted = (login, password) => ({
  type: SIGNUP_STARTED,
  login,
  password,
  authInProgress: true,
});

export const signupSuccessful = login => ({
  type: SIGNUP_SUCCESSFUL,
  login,
  password: null,
  authInProgress: false,
});

export const signupFailed = (login, error) => ({
  type: SIGNUP_FAILED,
  login,
  password: null,
  error,
  authInProgress: false,
});

export const loginStarted = (login, password) => ({
  type: LOGIN_STARTED,
  login,
  password,
  authInProgress: true,
});

export const loginSuccessful = (login, sid) => ({
  type: LOGIN_SUCCESSFUL,
  login,
  sid,
  password: null,
  authInProgress: false,
  loggedIn: true,
});

export const loginFailed = (login, error) => ({
  type: LOGIN_FAILED,
  login,
  password: null,
  error,
  authInProgress: false,
});

// функция входа принимает логин и пароль
export const authLogin = (login, password) => (dispatch) => {
  // сообщает о начале входа в систему LOGIN_STARTED
  dispatch(loginStarted(login, password));
  fetch('login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    // передает логин и пароль
    body: JSON.stringify({
      login,
      password,
    }),
  })
    .then(
      // при получении ответа
      (response) => {
        // обрабатывает возможную ошибку
        let errorText;
        if (response.ok === false) {
          switch (response.status) {
            case 403:
              errorText = 'User does not exist. Please, register first.';
              break;
            default:
              errorText = response.statusText;
              break;
          }
          dispatch(loginFailed(login, `Error ${response.status}: ${errorText}`));
          throw new Error('login failed');
        }
        // получает sid
        response
          .json()
          .then((data) => {
            // сообщает о успешном выполнении логина, передавая в редюсер текущий логин и sid
            dispatch(loginSuccessful(login, data.sid));
          })
          .catch((error) => {
            console.log(error);
          });
      },
    )
    .catch((error) => {
      console.log(error);
    });
};

// функция принимает логин и пароль
export const authSignup = (login, password) => (dispatch) => {
  // сообщает о начале регистрации, SIGNUP_STARTED
  dispatch(signupStarted(login, password));
  return fetch('signup', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    // передает в качестве параметров логин и пароль
    body: JSON.stringify({
      login,
      password,
    }),
  })
    .then(
      // получив ответ сообщает о успешном выполнеии регистрации, SIGNUP_SUCCESSFUL
      (response) => {
        // обрабатывает возможную ошибку
        if (response.ok === false) {
          let errorText;
          switch (response.status) {
            // эта ошибка не должна отстреливаться при правильной работе программы
            // т.к этот запрос не отправляется при отсутствии логина или пароля
            case 400:
              errorText = 'Problems with sending your login/password. Pleasy, try it again.';
              break;
            default:
              errorText = response.statusText;
              break;
          }
          dispatch(signupFailed(login, `Error ${response.status}: ${errorText}`));
          throw new Error('auth failed');
        }
        dispatch(signupSuccessful(login));
        // и начинает процесс логина
        dispatch(authLogin(login, password));
        authLogin(login, password);
      },
    )
    .catch((error) => {
      console.log(error);
    });
};
