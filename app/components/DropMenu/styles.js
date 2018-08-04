import { StyleSheet } from 'aphrodite';
import { button } from '../../assets/common styles/button';

export default StyleSheet.create({
  dropMenu: {
    position: 'absolute',
    top: '40px',
    left: '-120px',
    zIndex: '100',
    backgroundColor: 'rgba(20, 20, 20, 0.5)',
    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
    width: '200px',
    height: 'auto',
  },

  button: {
    ...button,
  },

  buttonNewBoard: {
    marginLeft: '50%',
    transform: 'translate(-50%)',
    marginBottom: '10px',
  },

  linkBoard: {
    display: 'block',
    height: '40px',
    lineHeight: '40px',
    fontSize: '20px',
    textDecoration: 'none',
    textAlign: 'center',
    color: '#fff',

    ':hover': {
      background: '#ebebeb',
      color: '#555555',
      borderRadius: '3px',
    },
  },
});
