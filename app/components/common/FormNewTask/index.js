import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reducerTasksAllType } from '../../../config/propTypes';
import { getTasks, addDefaultTaskTodo, addDefaultTaskDoing, addDefaultTaskDone } from '../../../redux/actions/tasks';
import config from '../../../../config';
import api from '../../../services/api';
import './styles.scss';

const mapStateToProps = ({ reducerTasks, reducerBoards }) => ({
  reducerTasks,
  reducerBoards,
});

const mapDispatchToProps = dispatch => ({
  getTasks: (id, user) => dispatch(getTasks(id, user)),
  addDefaultTaskTodo: data => dispatch(addDefaultTaskTodo(data)),
  addDefaultTaskDoing: data => dispatch(addDefaultTaskDoing(data)),
  addDefaultTaskDone: data => dispatch(addDefaultTaskDone(data)),
});

class FormNewTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentValue: '',
      titleValue: '',
      borderInput: false,
    };
  }
  onChangeContent = (event) => {
    this.setState({ contentValue: event.target.value });
  }
  onChangeTitle = (event) => {
    this.setState({ titleValue: event.target.value });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.props.reducerBoards.currentBoard !== null) {
      this.pushToTask();
    } else this.pushToDefaultTask();
  }
  pushToTask = () => {
    const status = {
      TO_DO: this.props.reducerTasks.tasksTodo.length,
      DOING: this.props.reducerTasks.tasksDoing.length,
      DONE: this.props.reducerTasks.tasksDone.length,
    };
    const data = {
      content: this.state.contentValue.trim(),
      title: this.state.titleValue.trim(),
      status: this.props.status,
      position: status[this.props.status],
      boards_id: this.props.reducerBoards.currentBoard,
    };
    if (data.content !== '' && data.title !== '') {
      const user = localStorage.getItem('user.id');
      api.post(`${config.path.BASE_URL}tasks`, data)
        .then(() => {
          this.props.close();
          this.props.getTasks(this.props.reducerBoards.currentBoard, user);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.warningEmptyFields();
    }
  }
  pushToDefaultTask = () => {
    const status = {
      TO_DO: this.props.reducerTasks.defaultTaskTodo.length,
      DOING: this.props.reducerTasks.defaultTaskDoing.length,
      DONE: this.props.reducerTasks.defaultTaskDone.length,
    };
    const data = {
      content: this.state.contentValue,
      title: this.state.titleValue,
      status: this.props.status,
      position: status[this.props.status],
      id: this.props.id,
    };
    if (this.state.contentValue !== '' && this.state.contentValue && this.state.titleValue !== '' && this.state.titleValue) {
      if (data.status === 'TO_DO') {
        this.props.addDefaultTaskTodo(data);
      } else if (data.status === 'DOING') {
        this.props.addDefaultTaskDoing(data);
      } else if (data.status === 'DONE') {
        this.props.addDefaultTaskDone(data);
      }
      this.props.counter();
      this.props.close();
    } else {
      this.warningEmptyFields();
    }
  }
  warningEmptyFields = () => {
    this.setState({ borderInput: true });
    setTimeout(() => {
      this.setState({ borderInput: false });
    }, 2000);
  }
  render() {
    const title = (this.state.borderInput) ? 'input input-title-task border-red' : 'input input-title-task';
    const content = (this.state.borderInput) ? 'input input-new-task border-red' : 'input input-title-task';
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className={title}
          placeholder="Enter the title"
          onChange={this.onChangeTitle}
          value={this.state.titleValue}
        />
        <textarea
          className={content}
          placeholder="Enter the content"
          onChange={this.onChangeContent}
          value={this.state.contentValue}
        />
        <button className="button button-new-task">
          Send
        </button>
      </form>
    );
  }
}

FormNewTask.defaultProps = {
  counter: () => { },
  id: 0,
};

FormNewTask.propTypes = {
  id: PropTypes.number,
  status: PropTypes.string.isRequired,
  counter: PropTypes.func,
  close: PropTypes.func.isRequired,
  getTasks: PropTypes.func.isRequired,
  addDefaultTaskTodo: PropTypes.func.isRequired,
  addDefaultTaskDoing: PropTypes.func.isRequired,
  addDefaultTaskDone: PropTypes.func.isRequired,
  reducerTasks: reducerTasksAllType.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormNewTask);
