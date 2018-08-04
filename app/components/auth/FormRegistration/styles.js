import { StyleSheet } from 'aphrodite';
import { button } from '../../../assets/common styles/button';

export default StyleSheet.create({
  title: {
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#666',
    margin: '0 0 30px 0',
    letterSpacing: '4px',
    font: 'normal 26px/1 Verdana, Helvetica',
    position: 'relative',
  },

  fieldset: {
    border: 0,
    padding: 0,
    margin: 0,
  },

  button: {
    ...button,
  },

  auth: {
    backgroundColor: '#fff',
    backgroundImage: 'linear-gradient(top, #fff, #eee)',
    height: '240px',
    width: '400px',
    margin: '-200px 0 0 -230px',
    padding: '30px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: '0',
    borderRadius: '3px',
    boxShadow: '0 0 2px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.2), 0 3px 0 #fff, 0 4px 0 rgba(0, 0, 0, 0.2), 0 6px 0 #fff, 0 7px 0 rgba(0, 0, 0, 0.2)',

    ':before': {
      content: '""',
      position: 'absolute',
      zIndex: '-1',
      border: '1px dashed #ccc',
      top: '5px',
      bottom: '5px',
      left: '5px',
      right: '5px',
      boxShadow: '0 0 0 1px #fff',
    },
  },

  registration: {
    height: '305px',
  },

  input: {
    position: 'relative',
    padding: '15px 15px 15px 30px',
    margin: '0 0 10px 0',
    fontSize: '22px',
    fontFamily: 'Lucida Sans Unicode, Trebuchet MS, Arial, Helvetica',
    width: '353px', /* 353 + 2 + 45 = 400 */
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 1px 1px #ccc inset, 0 1px 0 #fff',

    ':focus': {
      backgroundColor: '#fff',
      borderColor: '#e8c291',
      outline: 'none',
      boxShadow: '0 0 0 1px #e8c291 inset',
    },
  },

  actions: {
    margin: '25px 0 0 0',
  },

  linkForm: {
    color: '#3151A2',
    float: 'right',
    lineHeight: '35px',
    marginLeft: '10px',
    fontSize: '16px',
  },

});
