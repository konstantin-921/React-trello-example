const initial = {
  boards: [],
  tasks: [],
  tasksTodo: [],
  tasksDoing: [],
  tasksDone: [],
  defaultTasks: [],
  currentBoard: null,
};

const reducerTasks = (state = initial, action) => {
  const { data } = action;
  switch (action.type) {
    case 'RECEIVE_TASKS':
      return {
        ...state,
        tasks: data,
        tasksTodo: data.filter(elem => elem.status === 'TO_DO'),
        tasksDoing: data.filter(elem => elem.status === 'DOING'),
        tasksDone: data.filter(elem => elem.status === 'DONE'),
      };
    case 'ADD_DEFAULT_TASK':
      return {
        ...state,
        defaultTasks: [...state.defaultTasks, data],
      };
    case 'REMOVE_DEFAULT_TASK':
      return {
        ...state,
        defaultTasks: data,
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
        tasks: [],
        defaultTasks: [],
      };
    default:
      return state;
  }
};

export default reducerTasks;
