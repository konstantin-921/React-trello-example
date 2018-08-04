import React from 'react';
import { css } from 'aphrodite/no-important';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBoard } from '../../../redux/actions/boards';
import config from '../../../../config';
import api from '../../../services/api';
import styles from './styles';

const mapStateToProps = ({ reducerBoards }) => ({
  reducerBoards,
});

const mapDispatchToProps = dispatch => ({
  getBoard: () => dispatch(getBoard()),
});

class FormNewBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueInput: '',
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      caption: this.state.valueInput.trim(),
      share: false,
      id: Number(localStorage['user.id']),
    };
    if (data.caption !== '') {
      this.props.close();
      api.post(`${config.path.BASE_URL}boards`, data)
        .then(() => {
          this.props.getBoard();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.error('Name not entered');
    }
  }
  changeInput = (event) => {
    this.setState({ valueInput: event.target.value });
  }
  render() {
    return (
      <form className={css(styles.formNewBoard)} onSubmit={this.handleSubmit}>
        <input
          className={css(styles.inputNewBoard)}
          placeholder="Enter board name"
          onChange={this.changeInput}
          value={this.state.valueInput}
        />
        <button className={css(styles.button, styles.buttonNewBoard)}>Add</button>
      </form>
    );
  }
}

FormNewBoard.propTypes = {
  close: PropTypes.func.isRequired,
  getBoard: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormNewBoard);
