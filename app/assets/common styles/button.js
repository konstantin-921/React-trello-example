export const button = {
  backgroundColor: '#ffb94b',
  backgroundImage: 'linear-gradient(top, #fddb6f, #ffb94b)',

  borderRadius: '3px',
  textShadow: '0 1px 0 rgba(255,255,255,0.5)',
  boxShadow: '0 0 1px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(255, 255, 255, 0.3) inset',

  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: '#d69e31 #e3a037 #d5982d #e3a037',

  float: 'left',
  height: '30px',
  padding: '0',
  width: '120px',
  cursor: 'pointer',
  font: 'bold 15px Arial, Helvetica',
  color: '#8f5a0a',

  ':focus': {
    backgroundColor: '#fddb6f',
    backgroundImage: 'linear-gradient(top, #ffb94b, #fddb6f)',
    outline: 'none',
  },

  ':hover': {
    backgroundColor: '#fddb6f',
    backgroundImage: 'linear-gradient(top, #ffb94b, #fddb6f)',
    outline: 'none',
  },

  ':active': {
    outline: 'none',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.5) inset',
  },
};

export default button;
