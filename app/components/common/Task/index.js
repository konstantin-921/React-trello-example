import React from 'react';
import './style.scss';

class Task extends React.Component {
  render() {
    const data = (this.props.data) ? this.props.data : 'Oops';
    return (
      <div className="task">{data}</div>
    );
  }
}

export default Task;