import { arrayOf, string, oneOfType, number, shape } from 'prop-types';

export const reducerBoardsType = shape({
  boards: arrayOf(shape({
    id: string.isRequired,
    caption: string.isRequired,
    user_id: number.isRequired,
    share: string.isRequired,
  })).isRequired,
});

export const elementByTask = shape({
  id: oneOfType([
    string.isRequired,
    number.isRequired,
  ]),
  title: string.isRequired,
  content: string.isRequired,
  status: string.isRequired,
  boards_id: number,
  position: number.isRequired,
});

export const reducerDefaultTaskType = shape({
  defaultTaskTodo: arrayOf(shape({
    id: number.isRequired,
    title: string.isRequired,
    content: string.isRequired,
    status: string.isRequired,
    position: number.isRequired,
  })).isRequired,
  defaultTaskDoing: arrayOf(shape({
    id: number.isRequired,
    title: string.isRequired,
    content: string.isRequired,
    status: string.isRequired,
    position: number.isRequired,
  })).isRequired,
  defaultTaskDone: arrayOf(shape({
    id: number.isRequired,
    title: string.isRequired,
    content: string.isRequired,
    status: string.isRequired,
    position: number.isRequired,
  })).isRequired,
});

export const reducerTasksType = shape({
  tasksTodo: arrayOf(shape({
    id: string.isRequired,
    title: string.isRequired,
    content: string.isRequired,
    status: string.isRequired,
    boards_id: number.isRequired,
    position: number.isRequired,
  })).isRequired,
  tasksDoing: arrayOf(shape({
    id: string.isRequired,
    title: string.isRequired,
    content: string.isRequired,
    status: string.isRequired,
    boards_id: number.isRequired,
    position: number.isRequired,
  })).isRequired,
  tasksDone: arrayOf(shape({
    id: string.isRequired,
    title: string.isRequired,
    content: string.isRequired,
    status: string.isRequired,
    boards_id: number.isRequired,
    position: number.isRequired,
  })).isRequired,
});

export const reducerTasksAllType = shape({
  tasksTodo: arrayOf(shape({
    id: string.isRequired,
    title: string.isRequired,
    content: string.isRequired,
    status: string.isRequired,
    boards_id: number.isRequired,
    position: number.isRequired,
  })).isRequired,
  tasksDoing: arrayOf(shape({
    id: string.isRequired,
    title: string.isRequired,
    content: string.isRequired,
    status: string.isRequired,
    boards_id: number.isRequired,
    position: number.isRequired,
  })).isRequired,
  tasksDone: arrayOf(shape({
    id: string.isRequired,
    title: string.isRequired,
    content: string.isRequired,
    status: string.isRequired,
    boards_id: number.isRequired,
    position: number.isRequired,
  })).isRequired,
  defaultTaskTodo: arrayOf(shape({
    id: number.isRequired,
    title: string.isRequired,
    content: string.isRequired,
    status: string.isRequired,
    position: number.isRequired,
  })).isRequired,
  defaultTaskDoing: arrayOf(shape({
    id: number.isRequired,
    title: string.isRequired,
    content: string.isRequired,
    status: string.isRequired,
    position: number.isRequired,
  })).isRequired,
  defaultTaskDone: arrayOf(shape({
    id: number.isRequired,
    title: string.isRequired,
    content: string.isRequired,
    status: string.isRequired,
    position: number.isRequired,
  })).isRequired,
});
