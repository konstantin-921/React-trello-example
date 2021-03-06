import React from 'react';
import { css } from 'aphrodite/no-important';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import { reducerTasksType } from '../../config/propTypes';
import Task from '../common/Task';
import FormNewTask from '../common/FormNewTask';
import { setCurrentBoard } from '../../redux/actions/boards';
import { getTasks, reorderTasksTodo, reorderTasksDoing, reorderTasksDone } from '../../redux/actions/tasks';
import { reorder, move } from '../../services/helpers/helperDnd';
import styles from './styles';

const mapStateToProps = ({ reducerTasks, reducerBoards }) => ({
  reducerTasks,
  reducerBoards,
});

const mapDispatchToProps = dispatch => ({
  getTasks: (id, user) => dispatch(getTasks(id, user)),
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
    const user = localStorage.getItem('user.id');
    if (this.props.match.params.caption) {
      this.props.getTasks(this.props.match.params.caption, user);
      this.props.setCurrentBoard(Number(this.props.match.params.caption));
    }
  }
  componentWillReceiveProps(nextProps) {
    const user = localStorage.getItem('user.id');
    if (nextProps.match.params.caption
      && this.props.match.params.caption
      !== nextProps.match.params.caption) {
      this.props.getTasks(nextProps.match.params.caption, user);
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
        true,
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
        true,
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
      <div className={css(styles.main)}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div
                className={css(styles.taskContainer)}
                ref={provided.innerRef}
              >
                <h2>To do</h2>
                <button
                  className={css(styles.addLink)}
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
                className={css(styles.taskContainer)}
                ref={provided.innerRef}
              >
                <h2>Doing</h2>
                <button
                  className={css(styles.addLink)}
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
                className={css(styles.taskContainer)}
                ref={provided.innerRef}
              >
                <h2>Done</h2>
                <button
                  className={css(styles.addLink)}
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

MainContent.propTypes = {
  getTasks: PropTypes.func.isRequired,
  setCurrentBoard: PropTypes.func.isRequired,
  reorderTasksTodo: PropTypes.func.isRequired,
  reorderTasksDoing: PropTypes.func.isRequired,
  reorderTasksDone: PropTypes.func.isRequired,
  reducerTasks: reducerTasksType.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
