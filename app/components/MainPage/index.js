import React from 'react';
import { css } from 'aphrodite/no-important';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Link, Switch } from 'react-router-dom';
import { clearTasks } from '../../redux/actions/tasks';
import { clearCurrentBoard } from '../../redux/actions/boards';
import DropMenu from '../DropMenu';
import FormSaveBoard from '../common/FormSaveBoard';
import MainContent from '../MainContent';
import DefaultContent from '../DefaultContent';
import config from '../../../config';
import api from '../../services/api';
import styles from './styles';

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
      const boardId = this.props.reducerBoards.currentBoard;
      const data = {
        boardId,
      };
      api.put(`${config.path.BASE_URL}boards`, data)
        .then(() => {
          const share = localStorage.getItem('token.id');
          this.setState({ shareLink: `http://localhost:8080/${boardId}/share?boardId=${boardId}&token=${share}` });
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
      css(styles.button, styles.buttonSaveBoard, styles.buttonSaveBoardDisable) :
      css(styles.button, styles.buttonSaveBoard);
    const saveBoardForm = (this.state.toggleFormSaveBoard) ?
      <FormSaveBoard close={this.closeSaveBoardForm} />
      : null;
    const dropMenu = (this.state.toggleDropdown) ?
      <DropMenu dataRef={this.buttonBoard} close={this.closeDropMenu} /> : null;
    return (
      <div
        className={css(styles.container)}
      >
        <div className={css(styles.header)}>
          <button
            className={css(styles.button)}
            ref={this.buttonBoard}
            onClick={this.toggleDropdown}
          >
            Boards
          </button>
          <div
            className={css(styles.dropMenuContainer)}
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
            className={css(styles.button, styles.buttonShare)}
            onClick={this.shareBoard}
          >
            Share
          </button>
          <input
            className={css(styles.shareInput)}
            value={this.state.shareLink}
          />
          <Link
            href="/login"
            to="/login"
          >
            <button
              className={css(styles.button, styles.buttonLogout)}
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
