import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter, Redirect } from 'react-router-dom';

import AuthFormInput from '../components/AuthFormInput';
import { authLogin } from '../actions/auth';

const inputNames = {
  name: 'signin_username',
  pass: 'signin_password',
};

export class SignIn extends React.Component {
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
    );
  };
  // проверяет возможность отправки формы
  checkSubmit = (e) => {
    e.preventDefault();
    if (this.props.authInProgress) return;
    if (this.state.signin_usernameIsValid && this.state.signin_passwordIsValid) {
      // начинает процесс входа, если валидны логин и пароль
      this.props.startLogin(this.state.signin_username, this.state.signin_password);
    }
  };

  render() {
    return (
      <section className="signin">
        <form onSubmit={this.checkSubmit}>
          <h2>Sign In</h2>
          <AuthFormInput
            header="username"
            name={inputNames.name}
            id="signin-username__input"
            onInput={this.inputHandler}
            errorText={this.setError(inputNames.name)}
          />
          <AuthFormInput
            header="password"
            name={inputNames.pass}
            id="signin-password__input"
            type="password"
            onInput={this.inputHandler}
            errorText={this.setError(inputNames.pass)}
          />
          <p className="auth-error">{this.props.loginError}</p>
          <div className="signin-buttons__wrapper">
            <button type="submit" className="signin-button" id="signin-button">
              {this.props.authInProgress ? 'Wait..' : 'Log in'}
            </button>
            <p>or</p>
            <Link to="/signup" className="signup-button">
              Sign up
            </Link>
            {this.props.loggedIn ? <Redirect to="/catalog" /> : null}
          </div>
        </form>
      </section>
    );
  }
}

SignIn.propTypes = {
  startLogin: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  authInProgress: PropTypes.bool.isRequired,
  loginError: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  authInProgress: state.auth.authInProgress,
  loginError: state.auth.loginError,
});

const mapDispatchToProps = dispatch => ({
  startLogin: (login, password) => {
    dispatch(authLogin(login, password));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
