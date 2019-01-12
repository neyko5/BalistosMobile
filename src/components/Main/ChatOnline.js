import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

const ChatOnline = props => (
  <View style={styles.users}>
    <Text style={styles.title}>Users online</Text>
    <View style={{flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row'}}>
      {props.users && props.users.length && props.users.map(user => (
        <View key={user.username} style={[styles.userWrapper, props.username === user.username && styles.currentUserWrapper]}>
          <Text style={[styles.user, props.username === user.username && styles.currentUser]} key={user.username}>{user.username}</Text>
        </View>))}
    </View>
  </View>
);


const styles = StyleSheet.create({
  users: {
    margin: 5,
    marginBottom: 10,
    backgroundColor: '#f6f6f6',
    borderWidth: 1,
    borderColor: '#cccccc',
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  title: {
    color: '#3e414c',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 28
  },
  userWrapper: {
    marginBottom: 5,
    height: 24,
    borderRadius: 3,
    marginRight: 5,
    paddingHorizontal: 10,
    backgroundColor: '#d0d7dd',
  },
  currentUserWrapper: {
    backgroundColor: '#b1bb00'
  },
  currentUser: {
    color: '#ffffff'
  },
  user: {
    fontSize: 12,
    fontStyle: 'italic',
    lineHeight: 24,
    color: '#333333',
  },
});


ChatOnline.propTypes = {
  username: PropTypes.string,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

ChatOnline.defaultProps = {
  username: undefined,
};

export default ChatOnline;
