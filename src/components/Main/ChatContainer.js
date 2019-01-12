import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import Chat from './Chat';
import ChatOnline from './ChatOnline';
import { sendMessage } from '../../actions';


function mapStateToProps(state) {
  return {
    messages: state.playlist.messages,
    users: state.playlist.users,
    username: state.auth.username,
  };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  sendMessage: (message) => {
    dispatch(sendMessage(message, ownProps.playlist.id));
  },
});

class ChatContainer extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.users && this.props.users.length ?
          <ChatOnline users={this.props.users} username={this.props.username} /> : undefined}
        <Chat
          messages={this.props.messages}
          sendMessage={this.props.sendMessage}
          username={this.props.username}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1
  },
});


ChatContainer.propTypes = {
  username: PropTypes.string,
  sendMessage: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object.isRequired),
  messages: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  playlist: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
};

ChatContainer.defaultProps = {
  users: [],
  username: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
