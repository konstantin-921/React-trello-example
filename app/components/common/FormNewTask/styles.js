import { StyleSheet } from 'aphrodite';
import { button } from '../../../assets/common styles/button';

export default StyleSheet.create({
  inputTask: {
    height: 'auto',
    padding: '5px',
    width: '70%',
    minWidth: '50px',
    display: 'block',
    margin: '5px auto',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',

    ':focus': {
      boxShadow: 'rgb(255, 179, 57) 0px 0px 0px 2px',
      outline: 'none',
    },

  },

  borderRed: {
    boxShadow: 'inset 0 0 3px 1px rgb(185, 1, 1)',
  },

  button: {
    ...button,
  },

  buttonNewTask: {
    display: 'block',
    float: 'none',
    margin: '0 auto',
    width: '25%',
  },

});
