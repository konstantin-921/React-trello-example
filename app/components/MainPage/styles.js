import { StyleSheet } from 'aphrodite';
import { button } from '../../assets/common styles/button';

export default StyleSheet.create({
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    color: '#333',
    font: '14px Arial, Helvetica, sans-serif',
    lineHeight: '20px',
    fontWeight: '400',
  },

  header: {
    flex: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    height: '32px',
    padding: '4px',
    backgroundColor: 'rgb(74, 76, 77)',
  },

  dropMenuContainer: {
    position: 'relative',
  },

  shareInput: {
    display: 'block',
    marginTop: '1px',
    marginLeft: '5px',
    paddingLeft: '5px',
    borderRadius: '5px',
    width: '30%',
    height: '25px',
    fontSize: '14px',
    border: 'none',
    ':focus': {
      outline: 'none',
      boxShadow: '0 0 0 2px #ffb339',
    },
  },

  button: {
    ...button,
  },

  buttonShare: {
    marginLeft: 'auto',
  },

  buttonLogout: {
    marginLeft: '30px',
  },

  buttonSaveBoard: {
    marginLeft: '20px',
    minWidth: '90px',
  },

  buttonSaveBoardDisable: {
    backgroundColor: '#7a7a79',
    backgroundImage: 'none',

    borderColor: '#7a7a79',
    color: '#252525',

    ':hover': {
      backgroundColor: '#7a7a79',
      backgroundImage: 'none',
      outline: 'none',
    },
    ':focus': {
      backgroundColor: '#7a7a79',
      backgroundImage: 'none',
      outline: 'none',
    },
  },

});

