import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addVideo, getRelatedVideos } from '../../actions';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  id: state.playlist.id,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addVideo: () => {
    dispatch(addVideo(ownProps.video.id.videoId, ownProps.video.snippet.title, ownProps.id, false));
    dispatch(getRelatedVideos(ownProps.video.id.videoId));
  },
});

const RelatedVideoItem = props => (
  <View style={styles.playlistItem}>
    <Image style={styles.img} source={{ uri: `https://img.youtube.com/vi/${props.video.id.videoId}/0.jpg`}} />
    <View style={styles.info}>
      <Text style={styles.title}>{props.video.snippet.title}</Text>
    </View>
    <TouchableOpacity onPress={props.addVideo}><Text style={styles.button}>Add</Text></TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  playlistItem: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 68,
    marginBottom: 3
  },
  img: {
    width: 120,
    height: 68
  },
  info: {
      paddingVertical: 0,
      paddingHorizontal: 8,
      position: 'relative',
      height: '100%',
      flexGrow: 1,
      flexShrink: 1
  },
  title: {
      fontSize: 15,
      color: '#000000',
      maxHeight: 52,
      lineHeight: 17,
  },
  button: {
      width: 40,
      height: 24
  }
});
RelatedVideoItem.propTypes = {
  addVideo: PropTypes.func.isRequired,
  video: PropTypes.shape({
    id: PropTypes.shape({
      videoId: PropTypes.string.isRequired,
    }).isRequired,
    snippet: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RelatedVideoItem);
