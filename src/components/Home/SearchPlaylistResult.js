import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-native';
import { View, Text, StyleSheet } from 'react-native';

const SearchPlaylistResult = props => (
  <Link to={`/playlist/${props.result.id}`}>
    <View style={styles.link}>
      <Text style={styles.title}>{props.result.title}</Text>
      <Text style={styles.description}>{props.result.description}</Text>
    </View>
  </Link>
);

const styles = StyleSheet.create({
  link: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderStyle: 'solid',
    paddingVertical: 5,
    paddingHorizontal: 10
    
  },
  title: {
    width: '100%',
    overflow: 'hidden',
    height: 20,
    lineHeight: 20,
    fontSize: 13,
    fontWeight: '600',
    color: '#3e414c'
  },
  description: {
    lineHeight: 16,
    fontSize: 13,
    color: '#3e414c'
  }
});

SearchPlaylistResult.propTypes = {
  result: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default SearchPlaylistResult;
