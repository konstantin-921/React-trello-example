import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { reducerBoardsType } from '../../config/propTypes';
import { getBoard, setCurrentBoard } from '../../redux/actions/boards';
import FormNewBoard from '../common/FormNewBoard';
import BoardLink from '../common/BoardLink';
import './styles.scss';

const mapStateToProps = ({ reducerBoards }) => ({
  reducerBoards,
});

const mapDispatchToProps = dispatch => ({
  getBoard: () => dispatch(getBoard()),
  setCurrentBoard: data => dispatch(setCurrentBoard(data)),
});

class DropMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleNewBoard: false,
    };
  }
  componentDidMount() {
    this.props.getBoard();
    document.addEventListener('mousedown', this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }
  setBoard = () => {
    this.props.setCurrentBoard(null);
  }
  handleClickOutside = (event) => {
    const dataRef = this.props.dataRef.current;
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)
      && !dataRef.contains(event.target)) {
      this.props.close();
    }
  }
  toggleNewBoard = () => {
    this.setState({ toggleNewBoard: !this.state.toggleNewBoard });
  }
  closeNewBoard = () => {
    this.setState({ toggleNewBoard: false });
  }
  renderBoardsLink = () => {
    return this.props.reducerBoards.boards.map((elem) => {
      return <BoardLink key={elem.id} elem={elem} />;
    });
  }
  render() {
    const boards = this.renderBoardsLink();
    const form = (this.state.toggleNewBoard) ? <FormNewBoard close={this.closeNewBoard} /> : null;
    return (
      <div
        ref={this.setWrapperRef}
        id="dropMenu"
        className="dropMenu"
      >
        <ul>
          <li>
            <Link
              onClick={this.setBoard}
              className="link-board"
              href="/"
              to="/"
            > Default board
            </Link>
          </li>
          {boards}
        </ul>
        <button
          className="button button-new-board"
          onClick={this.toggleNewBoard}
        >
          New board
        </button>
        {form}
      </div>
    );
  }
}

DropMenu.propTypes = {
  dataRef: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  close: PropTypes.func.isRequired,
  getBoard: PropTypes.func.isRequired,
  setCurrentBoard: PropTypes.func.isRequired,
  reducerBoards: reducerBoardsType.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DropMenu);
