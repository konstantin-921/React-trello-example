import React from 'react';
import { connect } from 'react-redux';
import api from '../../../services/api';
import './styles.scss';

const mapStateToProps = ({ reducerTasks }) => ({
  reducerTasks,
});

class SaveBoardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueInput: '',
    };
  }
  onChangeInput = (event) => {
    this.setState({ valueInput: event.target.value });
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
        .then((response) => {
          const boardsId = Number(response.data);
          const todo = this.props.reducerTasks.defaultTaskTodo;
          const doing = this.props.reducerTasks.defaultTaskDoing;
          const done = this.props.reducerTasks.defaultTaskDone;
          const array = [...todo, ...doing, ...done];
          const data = array.map((elem) => {
            return { ...elem, boardsId };
          });
          api.post('http://localhost:3000/tasks', data)
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.error('Name not entered');
    }
  }
  render() {
    return (
      <form style={{ display: 'flex', width: '250px' }} onSubmit={this.handleSubmit}>
        <input
          className="input input-save-board"
          placeholder="Enter name of board"
          onChange={this.onChangeInput}
          value={this.state.valueInput}
        />
        <button
          className="button button-share-input"
        >Ok
        </button>
      </form>
    );
  }
}

export default connect(mapStateToProps)(SaveBoardForm);
