import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RelatedVideoItem from './RelatedVideoItem';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

function mapStateToProps(state) {
  return {
    related: state.results.related,
    id: state.playlist.id,
  };
}

const RelatedVideos = props => (
  <View>
      <Text>Related videos</Text>
      <ScrollView style={styles.relatedVideos}>
        {props.related.map(video => (<RelatedVideoItem
          video={video}
          id={props.id}
          key={video.id.videoId}
        />))}
      </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  relatedVideos: {
    flexShrink: 1
  }
});

RelatedVideos.propTypes = {
  id: PropTypes.number,
  related: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.shape({
        videoId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};

RelatedVideos.defaultProps = {
  id: undefined,
};

export default connect(mapStateToProps, undefined)(RelatedVideos);
