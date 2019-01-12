import React from 'react';
import PropTypes from 'prop-types';
import VideoList from './VideoList';
import SearchVideo from './SearchVideo';
import { View, StyleSheet } from 'react-native';

const VideoListContainer = props => (
  <View>
    <View>
      <View >
        <VideoList
          current={props.playlist.current}
          videos={props.playlist.videos}
        />
      </View>
    </View>
  </View>
);
const styles = StyleSheet.create({
  playlist: {
    backgroundColor: '#e1e1e1',
    width: '100%',
    marginBottom: 0,
  },
  header: {
    height: 40,
    width: '100%',
    padding: 10,
    backgroundColor: '#e6e6e6',
    display: 'flex',
    alignItems: 'center'
  },

});


VideoListContainer.propTypes = {
  playlist: PropTypes.shape({
    username: PropTypes.string,
    id: PropTypes.number,
    title: PropTypes.title,
    videos: PropTypes.arrayOf(
      PropTypes.object.isRequired,
    ).isRequired,
    current: PropTypes.object,
  }).isRequired,

};

VideoListContainer.defaultProps = {
  playlist: {
    username: undefined,
    id: undefined,
    current: undefined,
  },
};

export default VideoListContainer;
