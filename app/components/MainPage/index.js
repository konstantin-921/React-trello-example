import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Link, Switch } from 'react-router-dom';
import { clearTasks } from '../../redux/actions/tasks';
import { clearCurrentBoard } from '../../redux/actions/boards';
import DropMenu from '../DropMenu';
import FormSaveBoard from '../common/FormSaveBoard';
import MainContent from '../MainContent';
import DefaultContent from '../DefaultContent';
import api from '../../services/api';
import './styles.scss';

const mapStateToProps = ({ reducerTasks, reducerBoards }) => ({
  reducerTasks,
  reducerBoards,
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
      toggleFormSaveBoard: false,
      shareLink: '',
    };
    this.buttonBoard = React.createRef();
  }
  shareBoard = () => {
    if (this.props.reducerBoards.currentBoard !== null) {
      const data = {
        boardId: this.props.reducerBoards.currentBoard,
      };
      api.put('http://localhost:3000/boards', data)
        .then((response) => {
          console.log(response.data);
          const link = this.props.history.location.pathname;
          this.setState({ shareLink: `http://localhost:8080${link}` });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  saveBoard = () => {
    if (this.props.reducerBoards.currentBoard === null) {
      this.setState({ toggleFormSaveBoard: !this.state.toggleFormSaveBoard });
    }
  }
  closeDropMenu = () => {
    this.setState({ toggleDropdown: false });
  }
  closeSaveBoardForm = () => {
    this.setState({ toggleFormSaveBoard: false });
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
    const classSaveButton = (this.props.reducerBoards.currentBoard) ?
      'button button-save-board button-save-board-disable'
      : 'button button-save-board';
    const saveBoardForm = (this.state.toggleFormSaveBoard) ?
      <FormSaveBoard close={this.closeSaveBoardForm} />
      : null;
    const dropMenu = (this.state.toggleDropdown) ?
      <DropMenu dataRef={this.buttonBoard} close={this.closeDropMenu} /> : null;
    return (
      <div
        className="container"
      >
        <div className="header">
          <button
            className="button"
            ref={this.buttonBoard}
            onClick={this.toggleDropdown}
          >
            Boards
          </button>
          <div
            className="dropMenu-container"
          >
            {dropMenu}
          </div>
          <button
            className={classSaveButton}
            onClick={this.saveBoard}
          >Save board
          </button>
          {saveBoardForm}
          <button
            className="button button-share"
            onClick={this.shareBoard}
          >
            Share
          </button>
          <input
            className="input share-input"
            value={this.state.shareLink}
          />
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

MainPage.propTypes = {
  clearTasks: PropTypes.func.isRequired,
  clearCurrentBoard: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
