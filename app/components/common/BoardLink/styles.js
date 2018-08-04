import { StyleSheet } from 'aphrodite';

export default StyleSheet.create({
  linkBoardContainer: {
    position: 'relative',
  },

  linkBoard: {
    display: 'block',
    height: '40px',
    lineHeight: '40px',
    fontSize: '20px',
    textDecoration: 'none',
    textAlign: 'center',
    color: '#fff',
    overflow: 'hidden',
    padding: '0 30px 0 5px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',

    ':hover': {
      background: '#ebebeb',
      color: '#555555',
      borderRadius: '3px',
    },
  },

  buttonDeleteBoard: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#333',
    fontWeight: 'bold',
    width: '30px',
    height: '30px',

    ':hover': {
      color: '#fff',
    },
    ':focus': {
      outline: 'none',
    },
  },

});
