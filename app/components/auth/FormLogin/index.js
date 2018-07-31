import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import UserMessage from '../../common/UserMessage';
import { logining, addUserMessageAuth } from '../../../redux/actions/auth';
import '../styles.scss';

const mapStateToProps = ({ reducerAuth }) => ({
  reducerAuth,
});
const mapDispatchToProps = dispatch => ({
  addUserMessageAuth: data => dispatch(addUserMessageAuth(data)),
  logining: (username, userpass) => dispatch(logining(username, userpass)),
});

class FormLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      userMessage: '',
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.reducerAuth.userMessage !== this.props.reducerAuth.userMessage) {
      this.setState({ userMessage: nextProps.reducerAuth.userMessage });
    }
  }
  handleLogin = (event) => {
    this.setState({ login: event.target.value });
  }
  handlePassword = (event) => {
    this.setState({ password: event.target.value });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const login = this.state.login.trim();
    const password = this.state.password.trim();
    if (login !== '' && password !== '') {
      this.props.logining(login, password);
    } else {
      const data = 'All fields must be filled in';
      this.props.addUserMessageAuth(data);
    }
  }
  render() {
    const stateMessage = this.state.userMessage;
    const message = stateMessage ? <UserMessage data={stateMessage} source="AUTH_FORM" flag /> : null;
    const mainPage = this.props.reducerAuth.redirectLogin && localStorage['token.id'] && localStorage['token.id'] !== 'undefined' ? <Redirect to="/" /> : null;
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit} className="auth">
          <h1>Login form</h1>
          <fieldset className="inputs-login">
            <input
              name="login"
              type="text"
              placeholder="login"
              value={this.state.login}
              onChange={this.handleLogin}
            />
            <input
              name="pass"
              type="text"
              placeholder="password"
              value={this.state.password}
              onChange={this.handlePassword}
            />
            {message}
          </fieldset>
          <fieldset className="actions">
            <input type="submit" className="submit" value="LOGIN" />
            <Link
              className="link-form"
              href="/registration"
              to="/registration"
            >
              Registration
            </Link>
          </fieldset>
        </form>
        {mainPage}
      </React.Fragment>
    );
  }
}

FormLogin.propTypes = {
  logining: PropTypes.func.isRequired,
  reducerAuth: PropTypes.shape({
    login: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    redirectLogin: PropTypes.bool.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin);
