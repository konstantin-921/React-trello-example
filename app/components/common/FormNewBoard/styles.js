import { StyleSheet } from 'aphrodite';
import { button } from '../../../assets/common styles/button';

export default StyleSheet.create({
  formNewBoard: {
    marginTop: '10px',
  },

  inputNewBoard: {
    marginLeft: '50%',
    transform: 'translate(-50%)',
    border: 'none',
    borderRadius: '3px',
    padding: '3px',

    ':focus': {
      boxShadow: 'rgb(255, 179, 57) 0px 0px 0px 2px',
      outline: 'none',
    },
  },

  button: {
    ...button,
  },

  buttonNewBoard: {
    marginTop: '10px',
    marginLeft: '50%',
    transform: 'translate(-50%)',
  },

});
