import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { logining } from '../../../redux/actions/auth';
import '../styles.scss';

const mapStateToProps = ({ reducerAuth }) => ({
  reducerAuth,
});
const mapDispatchToProps = dispatch => ({
  logining: (username, userpass) => dispatch(logining(username, userpass)),
});

class FormLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
    };
  }
  handleLogin = (event) => {
    this.setState({ login: event.target.value });
  }
  handlePassword = (event) => {
    this.setState({ password: event.target.value });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.logining(this.state.login, this.state.password);
  }
  render() {
    // const stateMessage = this.state.userMessage;
    // const message = stateMessage ? <UserMessage data={stateMessage} flag /> : null;
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
        {/* {message} */}
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin);
