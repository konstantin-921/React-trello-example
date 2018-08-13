import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  main: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    color: 'white',
  },

  taskContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '32%',
    marginTop: '5px',
    borderRadius: '3px',
    backgroundColor: 'rgb(119, 122, 124)',
    textAlign: 'center',
  },

  addLink: {
    backgroundImage: 'linear-gradient(top, rgb(119, 122, 124), rgb(74, 76, 77))',
    borderRadius: '3px',
    textShadow: '0 1px 0 rgba(255,255,255,0.5)',
    boxShadow: '0 0 1px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(255, 255, 255, 0.3) inset',

    border: 'none',
    height: '50px',
    padding: '0',
    width: '100%',
    cursor: 'pointer',
    font: 'bold 15px Arial, Helvetica',
    color: '#fff',

    ':hover': {
      backgroundImage: 'linear-gradient(top, rgb(74, 76, 77), rgb(119, 122, 124))',
      outline: 'none',
    },
    ':focus': {
      backgroundImage: 'linear-gradient(top, rgb(74, 76, 77), rgb(119, 122, 124))',
      outline: 'none',
    },

    ':active': {
      outline: 'none',
      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.5) inset',
    },
  },

});
