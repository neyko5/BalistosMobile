import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { likeVideo, deleteVideo } from '../../actions';
import {Image, View, Text, StyleSheet } from 'react-native';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  likeVideo: (value) => {
    dispatch(likeVideo(ownProps.video.id, value));
  },
  deleteVideo: (videoId) => {
    dispatch(deleteVideo(videoId));
  },
});

const VideoListItem = (props) => {
  const upLike = props.video.likes
    .some(like => like.userId === props.userId && like.value === 1);
  const downLike = props.video.likes
    .some(like => like.userId === props.userId && like.value === -1);
  const likeCount = props.video.likes
    .reduce((total, like) => total + like.value, 0);

  let playlistItemStatus = '';
  let playlistItemClass = '';
  if (props.index === 0) {
    playlistItemClass = 'first';
    playlistItemStatus = 'Now playing';
  } else if (props.index === 1) {
    playlistItemClass = 'next';
    playlistItemStatus = 'Next';
  }

  return (
    <View style={styles.playlistItem}>
      {props.userId ?
        <View style={styles.vote}>
          <View
            onClick={() => props.likeVideo(upLike ? 0 : 1)}
            title={props.video.likes.filter(like => like.value === 1)
              .map(like => like.user.username).join(', ')}
          >
          </View>
          <Text style={styles.number}>{likeCount}</Text>
          <View
            className={`down ${downLike ? 'active' : ''}`}
            onClick={() => props.likeVideo(downLike ? 0 : -1)}
            title={props.video.likes.filter(like => like.value === -1)
              .map(like => like.user.username).join(', ')}
          >
          </View>
        </View> :
        <View style={styles.vote}>
          <Text style={styles.number}>{likeCount}</Text>
        </View>}
      <View style={styles.imgWrapper}>
        <Image source={{uri: `https://img.youtube.com/vi/${props.video.video.youtubeId}/0.jpg`}} style={styles.img} />
        <Text style={styles.status}>{playlistItemStatus}</Text>
      </View>
      <View style={styles.info}>
        <Text
          style={styles.title}
          rel="noopener noreferrer"
          title={'Open in YouTube'}
          href={`https://www.youtube.com/watch?v=${props.video.video.youtubeId}`}
        >{props.video.video.title}</Text>
        <Text style={styles.addedBy}>
          added by {props.video.autoAdded ? 'Balistos' : props.video.user.username}
        </Text>
      </View>
      {props.userId ? <View style={styles.deleteColumn}>
        <View style={styles.deleteButton} onClick={() => props.deleteVideo(props.video.id)} />
      </View> : undefined}
    </View>
  );
};


const styles = StyleSheet.create({
  playlistItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 68,
    marginBottom: 5
  },
  vote: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    height: '100%',
    width: 20
  },
  voteButton: {
    display: 'flex',
    padding: 0,
    color: '#696969'
  },
  number: {
    color: '#3e414c',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center'
  },
  status: {
    position: 'absolute',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    lineHeight: 25,
    width: 120,
    fontSize: 14,
    fontStyle: 'italic',
    paddingLeft: 5,
    top: 0,
    left: 0
  },
  imgWrapper: {
    width: 120,
    height: 68,
    position: 'relative'
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
      overflow: 'hidden'
  },
  addedBy: {
      color: '#333333',
      fontSize: 12,
      fontStyle: 'italic',
      marginTop: 3
  },
  deleteColumn: {
    alignSelf: 'flex-start',
    width: 24
  },
  deleteButton: {
      width: 24,
      height: 24
  }
});

VideoListItem.propTypes = {
  index: PropTypes.number.isRequired,
  userId: PropTypes.string,
  deleteVideo: PropTypes.func.isRequired,
  likeVideo: PropTypes.func.isRequired,
  video: PropTypes.shape({
    id: PropTypes.number.isRequired,
    video: PropTypes.shape({
      youtubeId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
    likes: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number,
      }),
    ).isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

VideoListItem.defaultProps = {
  userId: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoListItem);
