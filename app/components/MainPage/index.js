import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import DropMenu from '../DropMenu';
import MainContent from '../MainContent';
import './styles.scss';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleDropdown: false,
    };
  }
  logout = () => {
    localStorage.clear();
  }
  toggleDropdown = () => {
    this.setState({ toggleDropdown: !this.state.toggleDropdown });
  }
  render() {
    const path = this.props.location.pathname;
    const dropMenu = (this.state.toggleDropdown) ? <DropMenu /> : null;
    return (
      <div className="container">
        <div className="header">
          <button
            className="button"
            onClick={this.toggleDropdown}
          >
            Boards
          </button>
          <div className="dropMenu-container">
            {dropMenu}
          </div>
          <button className="button button-save-board">
            Save board
          </button>
          <button className="button button-share">
            Share
          </button>
          <input className="share-input" />
          <Link
            href="/login"
            to="/login"
          >
            <button
              className="button button-logout"
              onClick={this.logout}
            >
              Log out
            </button>
          </Link>
        </div>
        <Switch>
          <Route exact path="/" component={MainContent} />
          <Route path="/:caption" render={props => <MainContent {...props} name={path} />} />
        </Switch>
      </div>
    );
  }
}

export default MainPage;
