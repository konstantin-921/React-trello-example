import React from 'react';
import { connect } from 'react-redux';
import { getTasks, addDefaultTask } from '../../../redux/actions/main';
import api from '../../../services/api';
import './styles.scss';

const mapStateToProps = ({ reducerMain }) => ({
  reducerMain,
});

const mapDispatchToProps = dispatch => ({
  getTasks: id => dispatch(getTasks(id)),
  addDefaultTask: data => dispatch(addDefaultTask(data)),
});

class FormNewTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentValue: '',
      titleValue: '',
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
    if (this.props.reducerMain.currentBoard !== null) {
      const data = {
        content: this.state.contentValue,
        title: this.state.titleValue,
        status: this.props.status,
        position: '1',
        boards_id: Number(this.props.reducerMain.currentBoard),
      };
      if (this.state.contentValue !== '' && this.state.contentValue && this.state.titleValue !== '' && this.state.titleValue) {
        api.post('http://localhost:3000/tasks', data)
          .then(() => {
            this.props.close();
            this.props.getTasks(this.props.reducerMain.currentBoard);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.error('Content not entered');
      }
    } else this.pushToDefaultTask();
  }
  pushToDefaultTask = () => {
    const data = {
      content: this.state.contentValue,
      title: this.state.titleValue,
      status: this.props.status,
      position: '1',
      id: this.props.id,
    };
    if (this.state.contentValue !== '' && this.state.contentValue && this.state.titleValue !== '' && this.state.titleValue) {
      this.props.addDefaultTask(data);
      this.props.counter();
      this.props.close();
    } else {
      console.error('Content not entered');
    }
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="input input-title-task"
          placeholder="Enter thi title"
          onChange={this.onChangeTitle}
          value={this.state.titleValue}
        />
        <textarea
          className="input input-new-task"
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

export default connect(mapStateToProps, mapDispatchToProps)(FormNewTask);
