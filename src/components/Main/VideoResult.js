import React from 'react';
import PropTypes from 'prop-types';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const VideoResult = props => (
  <TouchableOpacity onPress={props.onItemClick} style={styles.button}>
    <Image source={{uri: props.image}} style={styles.img}/>
    <Text style={styles.title}>{props.title}</Text>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    display: 'flex',
    flexDirection: 'row'
  },
  img: {
      height: 40,
      width: 60
  },
  title: {
      lineHeight: 40,
      fontSize: 14,
      color: '#333333',
      height: 40,
      flexShrink: 1,
  }
});

VideoResult.propTypes = {
  onItemClick: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default VideoResult;
