import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentBoard, getBoard } from '../../../redux/actions/main';
import api from '../../../services/api';
import './styles.scss';

const mapStateToProps = ({ reducerMain }) => ({
  reducerMain,
});

const mapDispatchToProps = dispatch => ({
  setCurrentBoard: data => dispatch(setCurrentBoard(data)),
  getBoard: () => dispatch(getBoard()),
});

class BoardLink extends React.Component {
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
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const { caption, id } = this.props.elem;
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
        >x
        </button>
      </li>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardLink);
