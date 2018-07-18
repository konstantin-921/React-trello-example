import React from 'react';
import { connect } from 'react-redux';
import Task from '../common/Task';
import FormNewTask from '../common/FormNewTask';
import { getTasks, setCurrentBoard } from '../../redux/actions/main';

const mapStateToProps = ({ reducerMain }) => ({
  reducerMain,
});

const mapDispatchToProps = dispatch => ({
  getTasks: id => dispatch(getTasks(id)),
  setCurrentBoard: data => dispatch(setCurrentBoard(data)),
});

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsOpenTodo: false,
      formIsOpenDoing: false,
      formIsOpenDone: false,
      status: '',
    };
  }
  componentDidMount() {
    if (this.props.match.params.caption) {
      this.props.getTasks(this.props.match.params.caption);
      this.props.setCurrentBoard(this.props.match.params.caption);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.caption !== nextProps.match.params.caption) {
      this.props.getTasks(nextProps.match.params.caption);
    }
  }
  closeFormNewTaskTodo = () => {
    this.setState({ formIsOpenTodo: false });
  }
  closeFormNewTaskDoing = () => {
    this.setState({ formIsOpenDoing: false });
  }
  closeFormNewTaskDone = () => {
    this.setState({ formIsOpenDone: false });
  }
  openNewTaskTodo = () => {
    if (this.state.formIsOpenTodo) {
      return <FormNewTask status={this.state.status} close={this.closeFormNewTaskTodo} />;
    } return null;
  }
  openNewTaskDoing = () => {
    if (this.state.formIsOpenDoing) {
      return <FormNewTask status={this.state.status} close={this.closeFormNewTaskDoing} />;
    } return null;
  }
  openNewTaskDone = () => {
    if (this.state.formIsOpenDone) {
      return <FormNewTask status={this.state.status} close={this.closeFormNewTaskDone} />;
    } return null;
  }
  toggleFormTodo = () => {
    this.setState({ formIsOpenTodo: !this.state.formIsOpenTodo });
  }
  toggleFormDoing = () => {
    this.setState({ formIsOpenDoing: !this.state.formIsOpenDoing });
  }
  toggleFormDone = () => {
    this.setState({ formIsOpenDone: !this.state.formIsOpenDone });
  }
  toggleStatus = (event) => {
    this.setState({ status: event.target.value });
  }
  renderItemTodo = () => {
    const array = this.props.reducerMain.tasks.filter((elem) => {
      return elem.status === 'TO_DO';
    });
    return array.map((elem) => {
      return <Task key={elem.id} status={elem.status} data={elem.content} />;
    });
  }
  renderItemDoing = () => {
    const array = this.props.reducerMain.tasks.filter((elem) => {
      return elem.status === 'DOING';
    });
    return array.map((elem) => {
      return <Task key={elem.id} status={elem.status} data={elem.content} />;
    });
  }
  renderItemDone = () => {
    const array = this.props.reducerMain.tasks.filter((elem) => {
      return elem.status === 'DONE';
    });
    return array.map((elem) => {
      return <Task key={elem.id} status={elem.status} data={elem.content} />;
    });
  }
  render() {
    const contentTodo = this.renderItemTodo();
    const contentDoing = this.renderItemDoing();
    const contentDone = this.renderItemDone();
    const formTodo = this.openNewTaskTodo();
    const formDoing = this.openNewTaskDoing();
    const formDone = this.openNewTaskDone();
    return (
      <div className="main">
        <div className="task-container">
          <h2 className="title-task-container">To do</h2>
          <button
            value="TO_DO"
            className="add-link"
            onClick={this.toggleFormTodo}
            onMouseDown={this.toggleStatus}
          > Add task
          </button>
          {formTodo}
          {contentTodo}
        </div>
        <div className="task-container">
          <h2 className="title-task-container">Doing</h2>
          <button
            value="DOING"
            className="add-link"
            onClick={this.toggleFormDoing}
            onMouseDown={this.toggleStatus}
          >
            Add task
          </button>
          {formDoing}
          {contentDoing}
        </div>
        <div className="task-container">
          <h2 className="title-task-container">Done</h2>
          <button
            value="DONE"
            className="add-link"
            onClick={this.toggleFormDone}
            onMouseDown={this.toggleStatus}
          >Add task
          </button>
          {formDone}
          {contentDone}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
