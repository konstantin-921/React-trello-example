import React from 'react';
import { css } from 'aphrodite/no-important';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reducerDefaultTaskType } from '../../../config/propTypes';
import config from '../../../../config';
import api from '../../../services/api';
import styles from './styles';

const mapStateToProps = ({ reducerTasks }) => ({
  reducerTasks,
});

class FormSaveBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueInput: '',
    };
  }
  onChangeInput = (event) => {
    this.setState({ valueInput: event.target.value });
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
        .then((response) => {
          const boardsId = Number(response.data);
          const todo = this.props.reducerTasks.defaultTaskTodo;
          const doing = this.props.reducerTasks.defaultTaskDoing;
          const done = this.props.reducerTasks.defaultTaskDone;
          const array = [...todo, ...doing, ...done];
          const data = array.map((elem) => {
            return { ...elem, boardsId };
          });
          api.post(`${config.path.BASE_URL}tasks`, data)
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.error('Name not entered');
    }
  }
  render() {
    return (
      <form style={{ display: 'flex', width: '250px' }} onSubmit={this.handleSubmit}>
        <input
          className={css(styles.inputSaveBoard)}
          placeholder="Enter name of board"
          onChange={this.onChangeInput}
          value={this.state.valueInput}
        />
        <button
          className={css(styles.button, styles.buttonShareInput)}
        >Ok
        </button>
      </form>
    );
  }
}

FormSaveBoard.propTypes = {
  close: PropTypes.func.isRequired,
  reducerTasks: reducerDefaultTaskType.isRequired,
};

export default connect(mapStateToProps)(FormSaveBoard);
