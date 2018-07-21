import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentBoard, getBoard } from '../../../redux/actions/boards';
import api from '../../../services/api';
import './styles.scss';

const mapStateToProps = ({ reducerBoards }) => ({
  reducerBoards,
});

const mapDispatchToProps = dispatch => ({
  setCurrentBoard: data => dispatch(setCurrentBoard(data)),
  getBoard: () => dispatch(getBoard()),
});

class BoardLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }
  setBoard = () => {
    const { id } = this.props.elem;
    this.props.setCurrentBoard(id);
  }
  deleteBoard = () => {
    const { id } = this.props.elem;
    const data = {
      id,
    };
    api.delete('http://localhost:3000/boards', data)
      .then(() => {
        this.props.getBoard();
        if (this.props.elem.id === this.props.reducerBoards.currentBoard) {
          this.setState({ redirect: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const { caption, id } = this.props.elem;
    const redirectToDefault = (this.state.redirect) ? <Redirect to="/" /> : null;
    return (
      <li className="link-board-container">
        <Link
          className="link-board"
          onClick={this.setBoard}
          href={`/${id}`}
          to={`/${id}`}
        > {caption}
        </Link>
        <button
          className="button-delete-board"
          onClick={this.deleteBoard}
        >X
        </button>
        {redirectToDefault}
      </li>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardLink);
