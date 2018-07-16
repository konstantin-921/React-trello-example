import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentBoard } from '../../../redux/actions/main';
import './styles.scss';

const mapStateToProps = ({ reducerMain }) => ({
  reducerMain,
});

const mapDispatchToProps = dispatch => ({
  setCurrentBoard: data => dispatch(setCurrentBoard(data)),
});

class BoardLink extends React.Component {
  setBoard = () => {
    this.props.setCurrentBoard(this.props.id);
  }
  render() {
    return (
      <li>
        <Link
          onClick={this.setBoard}
          className="link-board"
          href={`/${this.props.id}`}
          to={`/${this.props.id}`}
        > {this.props.data}
        </Link>
      </li>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardLink);
