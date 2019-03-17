import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-native';
import {View, Text, StyleSheet} from 'react-native';

const PopularPlaylist = props => (
  <Link to={`/playlist/${props.data.id}`} style={styles.playlist}>
    <View style={styles.playlist}>
      <Text style={styles.place}>{props.index + 1}</Text>
      <View style={styles.square}>
        <Text style={styles.title}>{props.data.title}</Text>
        <Text style={styles.created}>creatsed by {props.data.username}</Text>
      </View>
    </View>
  </Link>
);


const styles = StyleSheet.create({
  playlist: {
    backgroundColor: '#DDDDDD',
    marginBottom: 5,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    height: 54
  },
  place: {
      width: 54,
      height: 54,
      backgroundColor: '#ffffff',
      color: '#758000',
      fontSize: 34,
      fontWeight: '300',
      lineHeight: 54,
      textAlign: 'center',
  },
  square: {
      padding: 5
  },
  title: {
      width: '100%',
      fontSize: 20,
      color: '#333333'
  },
  created: {
      fontStyle: 'italic',
      color: '#666666',
      fontSize: 12
  }
});

PopularPlaylist.propTypes = {
  index: PropTypes.number.isRequired,
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};


export default PopularPlaylist;
