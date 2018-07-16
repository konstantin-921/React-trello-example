import React from 'react';
import { connect } from 'react-redux';
import Task from '../common/Task';
import { getTasks } from '../../redux/actions/main';
import api from '../../services/api';

const mapStateToProps = ({ reducerMain }) => ({
  reducerMain,
});

const mapDispatchToProps = dispatch => ({
  getTasks: id => dispatch(getTasks(id)),
});


class MainContent extends React.Component {
  componentDidMount() {
    if (this.props.match.params.caption) {
      this.props.getTasks(this.props.match.params.caption);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.caption !== nextProps.match.params.caption) {
      this.props.getTasks(nextProps.match.params.caption);
    }
  }
  addTask = () => {
    const data = {
      content: 'Содержание',
      title: 'Заголовок',
      status: '1',
      position: '1',
      boards_id: Number(this.props.reducerMain.currentBoard),
    };
    api.post('http://localhost:3000/tasks', data)
      .then(() => {
        this.props.getTasks(this.props.reducerMain.currentBoard);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  renderItem = () => {
    return this.props.reducerMain.tasks.map((elem) => {
      return <Task key={elem.id} data={elem.content} />;
    });
  }
  render() {
    const content = this.renderItem();
    return (
      <div className="main">
        <div className="task-container">
          <h2 className="title-task-container">To do</h2>
          <button
            className="add-link"
            onClick={this.addTask}
          >
            Add task
          </button>
          {content}
        </div>
        <div className="task-container">
          <h2 className="title-task-container">Doing</h2>
          <button className="add-link">Add task</button>
        </div>
        <div className="task-container">
          <h2 className="title-task-container">Done</h2>
          <button className="add-link">Add task</button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
