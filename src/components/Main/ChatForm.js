import React from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, Button, StyleSheet} from 'react-native';


class ChatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      message: event,
    });
  }

  handleSubmit(event) {
    if (!this.state.message.trim()) {
      return;
    }
    this.props.sendMessage(this.state.message);
    this.props.onNewMessage();
    this.setState({
      message: '',
    });
  }

  render() {
    return (
      <View style={styles.container}> 
        <TextInput
          placeholder="Send a message"
          name="message"
          value={this.state.message}
          onChangeText={(text) => this.setState({message: text})}
          style={styles.input}
        />
        <Button title="Chat" onPress={this.handleSubmit}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10, 
    backgroundColor: '#e8e8e8'
  },
  input: {
    backgroundColor: '#f7f9f9',
    borderWidth: 1,
    borderColor: '#d9e0e2',
    height: 35,

    borderRadius: 3,
    fontSize: 13,
    lineHeight: 13,
    paddingHorizontal: 10,
    paddingVertical: 11,
    marginBottom: 7
  },
});

ChatForm.propTypes = {
  sendMessage: PropTypes.func.isRequired,
};

export default ChatForm;
