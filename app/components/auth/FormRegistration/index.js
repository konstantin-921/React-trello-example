import React from 'react';
import { css } from 'aphrodite/no-important';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registration, addUserMessageAuth } from '../../../redux/actions/auth';
import UserMessage from '../../common/UserMessage';
import styles from './styles';

const mapStateToProps = ({ reducerAuth }) => ({
  reducerAuth,
});

const mapDispatchToProps = dispatch => ({
  registration: (username, userpass, useremail) =>
    dispatch(registration(username, userpass, useremail)),
  addUserMessageAuth: data => dispatch(addUserMessageAuth(data)),
});

class FormRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      email: '',
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
  handleEmail = (event) => {
    this.setState({ email: event.target.value });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const username = this.state.login.trim();
    const userpass = this.state.password.trim();
    const useremail = this.state.email.trim();
    if (username !== '' && userpass !== '' && useremail !== '') {
      this.props.registration(username, userpass, useremail);
    } else {
      const data = 'All fields must be filled in';
      this.props.addUserMessageAuth(data);
    }
  }
  render() {
    const stateMessage = this.state.userMessage;
    const flag = this.state.userMessage !== 'Successful registration!';
    const message = stateMessage ? <UserMessage data={stateMessage} flag={flag} /> : null;
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit} className={css(styles.auth, styles.registration)}>
          <h1 className={css(styles.title)}>Registration form</h1>
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
            <input
              name="email"
              type="text"
              placeholder="email"
              className={css(styles.input)}
              value={this.state.email}
              onChange={this.handleEmail}
            />
            {message}
          </fieldset>
          <fieldset className={css(styles.fieldset, styles.actions)}>
            <input type="submit" className={css(styles.button)} value="REGISTRATION" />
            <Link
              className={css(styles.linkForm)}
              href="/login"
              to="/login"
            >
              Return to login
            </Link>
          </fieldset>
        </form>
      </React.Fragment>
    );
  }
}

FormRegistration.propTypes = {
  registration: PropTypes.func.isRequired,
  addUserMessageAuth: PropTypes.func.isRequired,
  reducerAuth: PropTypes.shape({
    userMessageAuth: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormRegistration);
