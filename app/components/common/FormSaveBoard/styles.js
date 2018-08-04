import { StyleSheet } from 'aphrodite';
import { button } from '../../../assets/common styles/button';

export default StyleSheet.create({
  inputSaveBoard: {
    marginTop: '3px',
    marginLeft: '5px',
    padding: '2px',
    width: '150px',
    height: '21px',
    borderRadius: '5px',
    border: 'none',

    ':focus': {
      boxShadow: 'rgb(255, 179, 57) 0px 0px 0px 2px',
      outline: 'none',
    },
  },

  button: {
    ...button,
  },

  buttonShareInput: {
    marginTop: '3px',
    height: '25px',
    width: '30%',
  },

});
