import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import { reducerDefaultTaskType } from '../../config/propTypes';
import { reorderDefaultTaskTodo, reorderDefaultTaskDoing, reorderDefaultTaskDone } from '../../redux/actions/tasks';
import { reorder, move } from '../../services/helpers/helperDnd';
import Task from '../common/Task';
import FormNewTask from '../common/FormNewTask';


const mapStateToProps = ({ reducerTasks }) => ({
  reducerTasks,
});

const mapDispatchToProps = dispatch => ({
  reorderDefaultTaskTodo: data => dispatch(reorderDefaultTaskTodo(data)),
  reorderDefaultTaskDoing: data => dispatch(reorderDefaultTaskDoing(data)),
  reorderDefaultTaskDone: data => dispatch(reorderDefaultTaskDone(data)),
});

class DefaultContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsOpenTodo: false,
      formIsOpenDoing: false,
      formIsOpenDone: false,
      localId: 0,
    };
  }
  // DnD function
  onDragEnd = (result) => {
    this.idList = {
      droppable: this.props.reducerTasks.defaultTaskTodo,
      droppable2: this.props.reducerTasks.defaultTaskDoing,
      droppable3: this.props.reducerTasks.defaultTaskDone,
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
        this.props.reorderDefaultTaskTodo(items);
      }
      if (source.droppableId === 'droppable2') {
        this.props.reorderDefaultTaskDoing(items);
      }
      if (source.droppableId === 'droppable3') {
        this.props.reorderDefaultTaskDone(items);
      }
    } else {
      const result = move(
        this.getListTasks(source.droppableId),
        this.getListTasks(destination.droppableId),
        source,
        destination,
      );
      if (result.droppable) {
        this.props.reorderDefaultTaskTodo(result.droppable);
      }
      if (result.droppable2) {
        this.props.reorderDefaultTaskDoing(result.droppable2);
      }
      if (result.droppable3) {
        this.props.reorderDefaultTaskDone(result.droppable3);
      }
    }
  }
  counterId = () => {
    this.setState(prevState => ({
      localId: prevState.localId + 1,
    }));
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
      return (<FormNewTask
        status="TO_DO"
        id={this.state.localId}
        counter={this.counterId}
        close={this.closeFormNewTaskTodo}
      />);
    } return null;
  }
  openNewTaskDoing = () => {
    if (this.state.formIsOpenDoing) {
      return (<FormNewTask
        status="DOING"
        id={this.state.localId}
        counter={this.counterId}
        close={this.closeFormNewTaskDoing}
      />);
    } return null;
  }
  openNewTaskDone = () => {
    if (this.state.formIsOpenDone) {
      return (<FormNewTask
        status="DONE"
        id={this.state.localId}
        counter={this.counterId}
        close={this.closeFormNewTaskDone}
      />);
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
    return this.props.reducerTasks.defaultTaskTodo.map((elem, index) => {
      return <Task key={elem.id} elem={elem} index={index} />;
    });
  }
  renderItemDoing = () => {
    return this.props.reducerTasks.defaultTaskDoing.map((elem, index) => {
      return <Task key={elem.id} elem={elem} index={index} />;
    });
  }
  renderItemDone = () => {
    return this.props.reducerTasks.defaultTaskDone.map((elem, index) => {
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

DefaultContent.propTypes = {
  reorderDefaultTaskTodo: PropTypes.func.isRequired,
  reorderDefaultTaskDoing: PropTypes.func.isRequired,
  reorderDefaultTaskDone: PropTypes.func.isRequired,
  reducerTasks: reducerDefaultTaskType.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultContent);
