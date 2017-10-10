import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import AuthFormInput from '../components/AuthFormInput';
import { authSignup } from '../actions/auth';

const inputNames = {
  name: 'signup_username',
  pass: 'signup_password',
  repass: 'signup_repassword',
};

export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // устанавливает текст ошибки для инпутов
  setError = (name) => {
    if (this.state[name] && this.state[name].length < 3) {
      return 'Length must be 3+';
    }
    return '';
  };
  // обрабатывает введение символов в инпут
  inputHandler = (e) => {
    const name = e.target.name;
    this.setState(
      {
        [name]: e.target.value,
        [`${name}IsValid`]: e.target.value.length > 2,
      },
      () => {
        this.setError(name);
      },
      () => {
        this.checkPasswords();
      },
    );
  };
  // проверка паролей
  checkPasswords = () => {
    const password = this.state.signup_password;
    const repassword = this.state.signup_repassword;
    // если один из паролей еще не введен - вернется пустая строка
    if (!password || !repassword) return '';

    // если первый пароль валиден и совпадает со вторым паролем
    if (this.state.signup_passwordIsValid && password !== repassword) {
      return 'Passwords do not match';
    }
    if (this.state.signup_passwordIsValid && password === repassword) {
      return 'Passwords match';
    }
    return '';
  };
  // проверяет возможность отправки формы
  checkSubmit = (e) => {
    e.preventDefault();
    if (this.props.authInProgress) return;
    // если логин/пароль валидны, а также пароли совпадают
    if (
      this.state.signup_usernameIsValid &&
      this.state.signup_passwordIsValid &&
      this.state.signup_password === this.state.signup_repassword
    ) {
      // вызывается action регистрации, в котором вызывается action входа
      const login = this.state.signup_username;
      const password = this.state.signup_password;
      this.props.startAuth(login, password);
    }
  };

  render() {
    return (
      <section className="signin">
        <form onSubmit={this.checkSubmit}>
          <h2>Sign up</h2>
          <AuthFormInput
            header="username"
            name={inputNames.name}
            id="signup-username__input"
            onInput={this.inputHandler}
            errorText={this.setError(inputNames.name)}
          />

          <AuthFormInput
            header="password"
            name={inputNames.pass}
            id="signup-password__input"
            type="password"
            onInput={this.inputHandler}
            errorText={this.setError(inputNames.pass)}
          />

          <AuthFormInput
            header="retype password"
            name={inputNames.repass}
            id="signup-repassword__input"
            type="password"
            onInput={this.inputHandler}
            errorText={this.checkPasswords()}
            labelClassName={
              this.checkPasswords() === 'Passwords match' ? 'input-success' : 'input-error'
            }
          />
          <p className="auth-error">{this.props.signUpError}</p>
          <div className="signin-buttons__wrapper">
            <button className="signin-button" id="signup-button">
              {this.props.authInProgress ? 'Wait..' : 'Sign up'}
            </button>
            {this.props.loggedIn ? <Redirect to="/catalog" /> : null}
          </div>
        </form>
      </section>
    );
  }
}

SignUp.propTypes = {
  startAuth: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  authInProgress: PropTypes.bool.isRequired,
  signUpError: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  authInProgress: state.auth.authInProgress,
  signUpError: state.auth.signUpError,
});

const mapDispatchToProps = dispatch => ({
  startAuth: (login, password) => {
    dispatch(authSignup(login, password));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
