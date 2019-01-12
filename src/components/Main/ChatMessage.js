import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

const ChatMessage = props => (
  <View>
    <Text>{props.message.user.username}: {props.message.message}</Text>
  </View>
);

ChatMessage.propTypes = {
  username: PropTypes.string,
  message: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
    message: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

ChatMessage.defaultProps = {
  username: undefined,
};

export default ChatMessage;
