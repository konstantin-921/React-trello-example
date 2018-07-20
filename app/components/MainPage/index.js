import React from 'react';
import { connect } from 'react-redux';
import { Route, Link, Switch } from 'react-router-dom';
import { clearTasks, clearCurrentBoard } from '../../redux/actions/main';
import DropMenu from '../DropMenu';
import SaveBoardForm from '../common/SaveBoardForm';
import MainContent from '../MainContent';
import DefaultContent from '../DefaultContent';
import './styles.scss';

const mapStateToProps = ({ reducerMain }) => ({
  reducerMain,
});

const mapDispatchToProps = dispatch => ({
  clearTasks: () => dispatch(clearTasks()),
  clearCurrentBoard: () => dispatch(clearCurrentBoard()),
});

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleDropdown: false,
      toggleSaveBoardForm: false,
    };
  }
  saveBoard = () => {
    if (this.props.reducerMain.currentBoard === null) {
      this.setState({ toggleSaveBoardForm: !this.state.toggleSaveBoardForm });
    }
  }
  closeSaveBoardForm = () => {
    this.setState({ toggleSaveBoardForm: false });
  }
  logout = () => {
    localStorage.clear();
    this.props.clearTasks();
    this.props.clearCurrentBoard();
  }
  toggleDropdown = () => {
    this.setState({ toggleDropdown: !this.state.toggleDropdown });
  }
  render() {
    const classSaveButton = (this.props.reducerMain.currentBoard) ?
      'button button-save-board button-save-board-disable'
      : 'button button-save-board';
    const saveBoardForm = (this.state.toggleSaveBoardForm) ?
      <SaveBoardForm close={this.closeSaveBoardForm} />
      : null;
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
          <button
            className={classSaveButton}
            onClick={this.saveBoard}
          >Save board
          </button>
          {saveBoardForm}
          <button className="button button-share">
            Share
          </button>
          <input className="input share-input" />
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
          <Route exact path="/" component={DefaultContent} />
          <Route path="/:caption" component={MainContent} />
        </Switch>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
