const initial = {
  tasksTodo: [],
  tasksDoing: [],
  tasksDone: [],
  defaultTaskTodo: [],
  defaultTaskDoing: [],
  defaultTaskDone: [],
  currentBoard: null,
};

const reducerTasks = (state = initial, action) => {
  const { data } = action;
  switch (action.type) {
    case 'RECEIVE_TASKS':
      return {
        ...state,
        tasksTodo: data.filter(elem => elem.status === 'TO_DO'),
        tasksDoing: data.filter(elem => elem.status === 'DOING'),
        tasksDone: data.filter(elem => elem.status === 'DONE'),
      };
    case 'ADD_DEFAULT_TASK_TODO':
      return {
        ...state,
        defaultTaskTodo: [...state.defaultTaskTodo, data],
      };
    case 'ADD_DEFAULT_TASK_DOING':
      return {
        ...state,
        defaultTaskDoing: [...state.defaultTaskDoing, data],
      };
    case 'ADD_DEFAULT_TASK_DONE':
      return {
        ...state,
        defaultTaskDone: [...state.defaultTaskDone, data],
      };
    case 'REORDER_DEFAULT_TASK_TODO':
      return {
        ...state,
        defaultTaskTodo: data,
      };
    case 'REORDER_DEFAULT_TASK_DOING':
      return {
        ...state,
        defaultTaskDoing: data,
      };
    case 'REORDER_DEFAULT_TASK_DONE':
      return {
        ...state,
        defaultTaskDone: data,
      };
    case 'REMOVE_DEFAULT_TASK_TODO':
      return {
        ...state,
        defaultTaskTodo: data,
      };
    case 'REMOVE_DEFAULT_TASK_DOING':
      return {
        ...state,
        defaultTaskDoing: data,
      };
    case 'REMOVE_DEFAULT_TASK_DONE':
      return {
        ...state,
        defaultTaskDone: data,
      };
    case 'REORDER_TASKS_TODO':
      return {
        ...state,
        tasksTodo: data,
      };
    case 'REORDER_TASKS_DOING':
      return {
        ...state,
        tasksDoing: data,
      };
    case 'REORDER_TASKS_DONE':
      return {
        ...state,
        tasksDone: data,
      };
    case 'CLEAR_TASKS':
      return {
        ...state,
        defaultTasks: [],
      };
    default:
      return state;
  }
};

export default reducerTasks;
