import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { getTasks, removeDefaultTaskTodo, removeDefaultTaskDoing, removeDefaultTaskDone } from '../../../redux/actions/tasks';
import api from '../../../services/api';
import './style.scss';

const mapStateToProps = ({ reducerTasks, reducerBoards }) => ({
  reducerTasks,
  reducerBoards,
});

const mapDispatchToProps = dispatch => ({
  getTasks: (id, user) => dispatch(getTasks(id, user)),
  removeDefaultTaskTodo: data => dispatch(removeDefaultTaskTodo(data)),
  removeDefaultTaskDoing: data => dispatch(removeDefaultTaskDoing(data)),
  removeDefaultTaskDone: data => dispatch(removeDefaultTaskDone(data)),
});

class Task extends React.Component {
  deleteTask = () => {
    if (this.props.reducerBoards.currentBoard !== null) {
      this.deleteSavedTask();
    } else {
      this.deleteDefaultTask();
    }
  }
  deleteSavedTask = () => {
    const user = localStorage.getItem('user.id');
    api.delete('http://localhost:3000/tasks', this.props.elem)
      .then(() => {
        this.props.getTasks(this.props.reducerBoards.currentBoard, user);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  deleteDefaultTask = () => {
    if (this.props.elem.status === 'TO_DO') {
      const array = this.props.reducerTasks.defaultTaskTodo.filter((elem) => {
        return elem.id !== this.props.elem.id;
      });
      this.sortByIndex(array);
      this.props.removeDefaultTaskTodo(array);
    } else if (this.props.elem.status === 'DOING') {
      const array = this.props.reducerTasks.defaultTaskDoing.filter((elem) => {
        return elem.id !== this.props.elem.id;
      });
      this.sortByIndex(array);
      this.props.removeDefaultTaskDoing(array);
    } else if (this.props.elem.status === 'DONE') {
      const array = this.props.reducerTasks.defaultTaskDone.filter((elem) => {
        return elem.id !== this.props.elem.id;
      });
      this.sortByIndex(array);
      this.props.removeDefaultTaskDone(array);
    }
  }
  sortByIndex = (arr) => {
    arr.forEach((elem, index) => {
      elem.position = index; // eslint-disable-line no-param-reassign
    });
  }
  render() {
    const { content, title } = this.props.elem;
    const { elem, index } = this.props;
    return (
      <Draggable key={elem.id} draggableId={elem.id} index={index}>
        {provided => (
          <div
            className="task"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="title-task">{title}</div>
            <button
              className="button button-delete-task"
              onClick={this.deleteTask}
            >X
            </button>
            <div>{content}</div>
          </div>
        )}
      </Draggable>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);
