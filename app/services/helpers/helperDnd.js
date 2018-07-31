import api from '../api';

const changePosition = (elem) => {
  api.put('http://localhost:3000/tasks', elem)
    .then(() => {
      console.log('Success update!');
    })
    .catch((error) => {
      console.log(error);
    });
};

export const reorder = (list, startIndex, endIndex, flag) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  removed.oldStatus = removed.status;
  removed.position = endIndex;
  removed.oldPosition = startIndex;

  result.forEach((elem, index) => {
    elem.position = index; // eslint-disable-line no-param-reassign
  });

  if (flag) {
    changePosition(removed);
  }

  return result;
};

export const move = (source, destination, droppableSource, droppableDestination, flag) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  removed.oldStatus = removed.status;

  const status = {
    droppable: 'TO_DO',
    droppable2: 'DOING',
    droppable3: 'DONE',
  };
  removed.status = status[droppableDestination.droppableId];
  removed.position = droppableDestination.index;
  removed.oldPosition = droppableSource.index;

  destClone.splice(droppableDestination.index, 0, removed);

  if (flag) {
    changePosition(removed);
  }

  destClone.forEach((elem, index) => {
    elem.position = index; // eslint-disable-line no-param-reassign
  });
  sourceClone.forEach((elem, index) => {
    elem.position = index; // eslint-disable-line no-param-reassign
  });

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

