import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Task from '../common/Task';
import FormNewTask from '../common/FormNewTask';
import { setCurrentBoard } from '../../redux/actions/boards';
import { getTasks, reorderTasksTodo, reorderTasksDoing, reorderTasksDone } from '../../redux/actions/tasks';
import { reorder, move } from '../../services/helpers/reorder';

const mapStateToProps = ({ reducerTasks, reducerBoards }) => ({
  reducerTasks,
  reducerBoards,
});

const mapDispatchToProps = dispatch => ({
  getTasks: id => dispatch(getTasks(id)),
  setCurrentBoard: data => dispatch(setCurrentBoard(data)),
  reorderTasksTodo: data => dispatch(reorderTasksTodo(data)),
  reorderTasksDoing: data => dispatch(reorderTasksDoing(data)),
  reorderTasksDone: data => dispatch(reorderTasksDone(data)),
});

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsOpenTodo: false,
      formIsOpenDoing: false,
      formIsOpenDone: false,
    };
  }
  componentDidMount() {
    if (this.props.match.params.caption) {
      this.props.getTasks(this.props.match.params.caption);
      this.props.setCurrentBoard(this.props.match.params.caption);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.caption
      && this.props.match.params.caption
      !== nextProps.match.params.caption) {
      this.props.getTasks(nextProps.match.params.caption);
    }
  }

  // DnD function
  onDragEnd = (result) => {
    this.idList = {
      droppable: this.props.reducerTasks.tasksTodo,
      droppable2: this.props.reducerTasks.tasksDoing,
      droppable3: this.props.reducerTasks.tasksDone,
    };
    this.getListTasks = id => this.idList[id];
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getListTasks(source.droppableId),
        source.index,
        destination.index,
      );
      if (source.droppableId === 'droppable') {
        this.props.reorderTasksTodo(items);
      }
      if (source.droppableId === 'droppable2') {
        this.props.reorderTasksDoing(items);
      }
      if (source.droppableId === 'droppable3') {
        this.props.reorderTasksDone(items);
      }
    } else {
      const result = move(
        this.getListTasks(source.droppableId),
        this.getListTasks(destination.droppableId),
        source,
        destination,
      );
      if (result.droppable) {
        this.props.reorderTasksTodo(result.droppable);
      }
      if (result.droppable2) {
        this.props.reorderTasksDoing(result.droppable2);
      }
      if (result.droppable3) {
        this.props.reorderTasksDone(result.droppable3);
      }
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
      return <FormNewTask status="TO_DO" close={this.closeFormNewTaskTodo} />;
    } return null;
  }
  openNewTaskDoing = () => {
    if (this.state.formIsOpenDoing) {
      return <FormNewTask status="DOING" close={this.closeFormNewTaskDoing} />;
    } return null;
  }
  openNewTaskDone = () => {
    if (this.state.formIsOpenDone) {
      return <FormNewTask status="DONE" close={this.closeFormNewTaskDone} />;
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
  renderItemTodo = () => {
    return this.props.reducerTasks.tasksTodo.map((elem, index) => {
      return <Task key={elem.id} elem={elem} index={index} />;
    });
  }
  renderItemDoing = () => {
    return this.props.reducerTasks.tasksDoing.map((elem, index) => {
      return <Task key={elem.id} elem={elem} index={index} />;
    });
  }
  renderItemDone = () => {
    return this.props.reducerTasks.tasksDone.map((elem, index) => {
      return <Task key={elem.id} elem={elem} index={index} />;
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
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div
                className="task-container"
                ref={provided.innerRef}
              >
                <h2 className="title-task-container">To do</h2>
                <button
                  className="add-link"
                  onClick={this.toggleFormTodo}
                > Add task
                </button>
                {formTodo}
                {contentTodo}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="droppable2">
            {provided => (
              <div
                className="task-container"
                ref={provided.innerRef}
              >
                <h2 className="title-task-container">Doing</h2>
                <button
                  className="add-link"
                  onClick={this.toggleFormDoing}
                >
                  Add task
                </button>
                {formDoing}
                {contentDoing}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="droppable3">
            {provided => (
              <div
                className="task-container"
                ref={provided.innerRef}
              >
                <h2 className="title-task-container">Done</h2>
                <button
                  className="add-link"
                  onClick={this.toggleFormDone}
                >Add task
                </button>
                {formDone}
                {contentDone}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
