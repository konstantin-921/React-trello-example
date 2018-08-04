import React from 'react';
import { css } from 'aphrodite/no-important';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { elementByTask } from '../../../config/propTypes';
import { getTasks, removeDefaultTaskTodo, removeDefaultTaskDoing, removeDefaultTaskDone } from '../../../redux/actions/tasks';
import config from '../../../../config';
import api from '../../../services/api';
import styles from './styles';

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
    api.delete(`${config.path.BASE_URL}tasks`, this.props.elem)
      .then(() => {
        this.props.getTasks(this.props.reducerBoards.currentBoard, user);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  deleteDefaultTask = () => {
    this.idAction = {
      TO_DO: this.props.removeDefaultTaskTodo,
      DOING: this.props.removeDefaultTaskDoing,
      DONE: this.props.removeDefaultTaskDone,
    };
    this.status = {
      TO_DO: this.props.reducerTasks.defaultTaskTodo,
      DOING: this.props.reducerTasks.defaultTaskDoing,
      DONE: this.props.reducerTasks.defaultTaskDone,
    };
    this.action = (array) => {
      this.idAction[this.props.elem.status](array);
    };

    const array = this.status[this.props.elem.status].filter((elem) => {
      return elem.id !== this.props.elem.id;
    });
    array.forEach((elem, index) => {
      elem.position = index; // eslint-disable-line no-param-reassign
    });

    this.action(array);
  }
  render() {
    const { content, title } = this.props.elem;
    const { elem, index } = this.props;
    return (
      <Draggable key={elem.id} draggableId={elem.id} index={index}>
        {provided => (
          <div
            className={css(styles.task)}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className={css(styles.titleTask)}>{title}</div>
            <button
              className={css(styles.button, styles.buttonDeleteTask)}
              onClick={this.deleteTask}
            >X
            </button>
            <div className={css(styles.contentTask)}>{content}</div>
          </div>
        )}
      </Draggable>
    );
  }
}

Task.defaultProps = {
  elem: PropTypes.shape({
    boards_id: 0,
  }),
};

Task.propTypes = {
  index: PropTypes.number.isRequired,
  getTasks: PropTypes.func.isRequired,
  elem: elementByTask,
  removeDefaultTaskTodo: PropTypes.func.isRequired,
  removeDefaultTaskDoing: PropTypes.func.isRequired,
  removeDefaultTaskDone: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
