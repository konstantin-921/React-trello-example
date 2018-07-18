import React from 'react';
import { connect } from 'react-redux';
import { getTasks } from '../../../redux/actions/main';
import api from '../../../services/api';

const mapStateToProps = ({ reducerMain }) => ({
  reducerMain,
});

const mapDispatchToProps = dispatch => ({
  getTasks: id => dispatch(getTasks(id)),
});

class FormNewTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }
  onChange = (event) => {
    this.setState({ inputValue: event.target.value });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      content: this.state.inputValue,
      title: 'Заголовок',
      status: this.props.status,
      position: '1',
      boards_id: Number(this.props.reducerMain.currentBoard),
    };
    if (this.state.inputValue !== '' && this.state.inputValue !== undefined) {
      api.post('http://localhost:3000/tasks', data)
        .then(() => {
          this.props.close();
          this.props.getTasks(this.props.reducerMain.currentBoard);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.error('Content not entered');
    }
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          onChange={this.onChange}
          value={this.state.inputValue}
        />
        <button>
          Send
        </button>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormNewTask);
