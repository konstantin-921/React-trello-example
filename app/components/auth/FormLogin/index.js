import React from 'react';
import { css } from 'aphrodite/no-important';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import UserMessage from '../../common/UserMessage';
import { logining, addUserMessageAuth } from '../../../redux/actions/auth';
import styles from './styles';

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
  mainPage = () => {
    if (this.props.reducerAuth.redirectLogin
      && localStorage['token.id']
      && localStorage['token.id'] !== 'undefined') {
      return <Redirect to="/" />;
    } return null;
  }
  render() {
    const stateMessage = this.state.userMessage;
    const message = stateMessage ? <UserMessage data={stateMessage} flag /> : null;
    const mainPage = this.mainPage();
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit} className={css(styles.auth)}>
          <h1 className={css(styles.title)}>Login form</h1>
          <fieldset className={css(styles.fieldset)}>
            <input
              name="login"
              type="text"
              placeholder="login"
              className={css(styles.input)}
              value={this.state.login}
              onChange={this.handleLogin}
            />
            <input
              name="pass"
              type="text"
              placeholder="password"
              className={css(styles.input)}
              value={this.state.password}
              onChange={this.handlePassword}
            />
            {message}
          </fieldset>
          <fieldset className={css(styles.fieldset, styles.actions)}>
            <input type="submit" className={css(styles.button)} value="LOGIN" />
            <Link
              className={css(styles.linkForm)}
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
  addUserMessageAuth: PropTypes.func.isRequired,
  reducerAuth: PropTypes.shape({
    redirectLogin: PropTypes.bool.isRequired,
    userMessageAuth: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin);
