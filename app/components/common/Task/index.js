import React from 'react';
import { connect } from 'react-redux';
import { getTasks, removeDefaultTask } from '../../../redux/actions/tasks';
import api from '../../../services/api';
import './style.scss';

const mapStateToProps = ({ reducerTasks, reducerBoards }) => ({
  reducerTasks,
  reducerBoards,
});

const mapDispatchToProps = dispatch => ({
  getTasks: id => dispatch(getTasks(id)),
  removeDefaultTask: data => dispatch(removeDefaultTask(data)),
});

class Task extends React.Component {
  deleteTask = () => {
    if (this.props.reducerBoards.currentBoard !== null) {
      const { id } = this.props.elem;
      const userData = {
        id,
      };
      api.delete('http://localhost:3000/tasks', userData)
        .then(() => {
          this.props.getTasks(this.props.reducerBoards.currentBoard);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.deleteDefaultTask();
    }
  }
  deleteDefaultTask = () => {
    const array = this.props.reducerTasks.defaultTasks.filter((elem) => {
      return elem.id !== this.props.elem.id;
    });
    this.props.removeDefaultTask(array);
  }
  render() {
    const { content, title } = this.props.elem;
    return (
      <div className="task">
        <div className="title-task">{title}</div>
        <button
          className="button button-delete-task"
          onClick={this.deleteTask}
        >X
        </button>
        <div>{content}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);
