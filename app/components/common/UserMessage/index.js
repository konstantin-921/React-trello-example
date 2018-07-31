import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { hideUserMessage } from '../../../redux/actions/auth';

const mapStateToProps = ({ reducerAuth }) => ({
  reducerAuth,
});

const mapDispatchToProps = dispatch => ({
  hideUserMessage: () => dispatch(hideUserMessage()),
});

class UserMessage extends React.PureComponent {
  componentDidMount() {
    setTimeout(this.props.hideUserMessage, 3000);
  }
  render() {
    const text = this.props.data;
    let customStyle = '';
    if (this.props.source === 'AUTH_FORM') {
      customStyle = this.props.flag ? 'container_unsuccessful' : 'container_successful';
    }
    return (
      <div
        className={customStyle}
      >{text}
      </div>
    );
  }
}

UserMessage.propTypes = {
  hideUserMessage: PropTypes.func.isRequired,
  data: PropTypes.string.isRequired,
  flag: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMessage);
