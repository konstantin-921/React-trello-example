import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registration } from '../../../redux/actions/auth';
import '../styles.scss';

const mapStateToProps = ({ reducerAuth }) => ({
  reducerAuth,
});

const mapDispatchToProps = dispatch => ({
  registration: (username, userpass, useremail) =>
    dispatch(registration(username, userpass, useremail)),
});

class FormRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      email: '',
    };
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
    if (this.state.login !== '' && this.state.password !== '' && this.state.email !== '') {
      const username = this.state.login;
      const userpass = this.state.password;
      const useremail = this.state.email;
      this.props.registration(username, userpass, useremail);
    } else {
      const data = 'All fields must be filled in';
      console.log(data);
    }
  }
  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit} className="auth registration">
          <h1>Registration form</h1>
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
            <input
              name="email"
              type="text"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleEmail}
            />
          </fieldset>
          <fieldset className="actions">
            <input type="submit" className="submit" value="REGISTRATION" />
            <Link
              className="link-form"
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

export default connect(mapStateToProps, mapDispatchToProps)(FormRegistration);
