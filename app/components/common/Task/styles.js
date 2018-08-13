import { StyleSheet } from 'aphrodite';
import { button } from '../../../assets/common styles/button';

export default StyleSheet.create({
  task: {
    position: 'relative',
    width: '70%',
    minHeight: '30px',
    margin: '4px 0px',
    borderRadius: '4px',
    color: '#555555',
    fontSize: '16px',
    lineHeight: '30px',
    overflow: 'hidden',
  },

  titleTask: {
    fontWeight: 'bold',
    backgroundColor: '#fddc9e',
    overflow: 'hidden',
    padding: '0 5px 0 5px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  contentTask: {
    overflow: 'hidden',
    backgroundColor: 'aliceblue',
    padding: '0 5px 0 5px',
  },

  button: {
    ...button,
  },

  buttonDeleteTask: {
    position: 'absolute',
    width: '22px',
    height: '22px',
    top: '2px',
    right: '2px',
  },

});
