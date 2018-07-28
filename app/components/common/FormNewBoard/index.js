import React from 'react';
import { connect } from 'react-redux';
import { getBoard } from '../../../redux/actions/boards';
import api from '../../../services/api';
import './styles.scss';

const mapStateToProps = ({ reducerBoards }) => ({
  reducerBoards,
});

const mapDispatchToProps = dispatch => ({
  getBoard: () => dispatch(getBoard()),
});


class FormNewBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueInput: '',
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      caption: this.state.valueInput,
      share: false,
      id: Number(localStorage['user.id']),
    };
    if (this.state.valueInput !== '') {
      this.props.close();
      api.post('http://localhost:3000/boards', data)
        .then(() => {
          this.props.getBoard();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.error('Name not entered');
    }
  }
  changeInput = (event) => {
    this.setState({ valueInput: event.target.value });
  }
  render() {
    return (
      <form className="form-new-board" onSubmit={this.handleSubmit}>
        <input
          className="input input-new-board"
          placeholder="Enter board name"
          onChange={this.changeInput}
          value={this.state.valueInput}
        />
        <button className="button button-new-board">Add</button>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormNewBoard);
