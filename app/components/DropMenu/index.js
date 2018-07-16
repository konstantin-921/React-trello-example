import React from 'react';
import { connect } from 'react-redux';
import { getBoard } from '../../redux/actions/main';
import FormNewBoard from '../common/FormNewBoard';
import BoardLink from '../common/BoardLink';
import './styles.scss';

const mapStateToProps = ({ reducerMain }) => ({
  reducerMain,
});

const mapDispatchToProps = dispatch => ({
  getBoard: () => dispatch(getBoard()),
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
  }
  toggleNewBoard = () => {
    this.setState({ toggleNewBoard: !this.state.toggleNewBoard });
  }
  closeNewBoard = () => {
    this.setState({ toggleNewBoard: false });
  }
  renderBoardsLink = () => {
    return this.props.reducerMain.boards.map((elem) => {
      return <BoardLink key={elem.id} data={elem.caption} id={elem.id} />;
    });
  }
  render() {
    const boards = this.renderBoardsLink();
    const form = (this.state.toggleNewBoard) ? <FormNewBoard close={this.closeNewBoard} /> : null;
    return (
      <div className="dropMenu">
        <ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(DropMenu);
