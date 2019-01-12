import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-native-youtube'
import vTime from 'video-time';
import { View, Button, Text, Slider, StyleSheet, TouchableOpacity } from 'react-native';
import { youtubeParams } from '../../settings';



class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: undefined,
      elapsed: 0,
      total: 0,
      volume: 100,
      previousVolume: 0,
      paused: false,
      start: 0,
    };
    this.resumeVideo = this.resumeVideo.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.updateElapsed = this.updateElapsed.bind(this);
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    this.deleteCurrentVideo = this.deleteCurrentVideo.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.current && this.props.current &&
      prevProps.current.video.youtubeId !== this.props.current.video.youtubeId) {
      if (this.state.player) {
        this.state.player.seekTo(0);
      }
      this.resumeVideo(this.props.current.video.youtubeId);
      this.props.startVideo(this.props.current.id);
      this.props.getRelatedVideos(this.props.current.video.youtubeId);
    }
    if (!prevProps.current && this.props.current) {
      this.props.startVideo(this.props.current.id);
      this.props.getRelatedVideos(this.props.current.video.youtubeId);
     /*  if (this.state.player) {
        this.state.player.seekTo(this.props.current.startedAt);
      } */
    }
    if (this.props.current && (!prevProps.current ||
      prevProps.current.video.youtubeId !== this.props.current.video.youtubeId)) {
      const options = {
        body: this.props.current.video.title,
        icon: `https://img.youtube.com/vi/${this.props.current.video.youtubeId}/0.jpg`,
        tag: 'video',
        requireInteraction: false,
      };
    }
  }

  onSpeakerClick() {
    if (this.state.volume === 0) {
      this.setState({
        volume: this.state.previousVolume,
        previousVolume: 0,
        elapsed: 0,
        total: 1
      });
      this.state.player.setVolume(this.state.previousVolume);
    } else {
      this.setState({
        volume: 0,
        previousVolume: this.state.volume,
      });
      /* this.state.player.setVolume(0); */
    }
  }
  onSliderChange(value) {
    this.setState({
      volume: value,
    });
    /* this.state.player.setVolume(value); */
  }
  resumeVideo(youtubeId) {
    this.setState({
      current: youtubeId,
      paused: false,
    });
  }
  onPlayerStateChange(event) {
    console.log("ELAPSED", event);
    if (event.state && event.state === 'unstarted') {
      this.props.finishVideo(this.props.current.id);
    }
  }
  deleteCurrentVideo() {
    this.props.deleteVideo(this.props.current.id);
  }
  play() {
    this.setState({
      paused: false,
    });
    /* this.state.player.playVideo(); */
  }
  pause() {
    this.setState({
      paused: true,
    });
    /* this.state.player.pauseVideo(); */
  }
  updateElapsed(event) {
    console.log("ELAPSED", event);
    this.setState({
      elapsed: event.currentTime,
      total: event.duration,
    });
  }

  render() {
    return (
          <View>
            <View>
              <View className="overlay" />
              {this.props.current ?
                <YouTube
                  apiKey="AIzaSyDUf-SEv49u9KUvsxZ6jwdjkMdZ1aFjQOI"
                  style={styles.player}
                  videoId={this.props.current.video.youtubeId}  // The YouTube video ID
                  play={!this.state.paused}             // control playback of video with true/fals  
                  loop={true}    
                  controls={0} 
                  origin='https://www.youtube.com'
                  onProgress={this.updateElapsed}
                  onChangeState={this.onPlayerStateChange}
                />
                : <View className="video-empty">
                  <Text className="text-big">No video</Text>
                  <Text className="text-small">Make sure you add some new videos to the playlist</Text>
                </View>
              }
            </View>
            <View className="progress">
              <View className="bar" />
            </View>
            <View style={styles.toolbar}>
              {this.state.paused ? 
                <TouchableOpacity onPress={this.play}><Text style={styles.controlButton}>Play</Text></TouchableOpacity> :
                <TouchableOpacity onPress={this.pause}><Text style={styles.controlButton}>Pause</Text></TouchableOpacity>}
              <View style={styles.timer}>
                <Text style={styles.timerText}>{vTime(this.state.elapsed)}</Text>
                <Text style={styles.timerText}> / {vTime(this.state.total)} </Text>
              </View>
            </View>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  player: {
    minHeight: 212, 
    width: '100%'
  },
  toolbar: {
    height: 20,
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  controlButton: {
    lineHeight: 20,
    fontSize: 13
  },
  timer: {
    display: 'flex',
    flexDirection: 'row'
  },
  timerText: {
    lineHeight: 20,
    fontSize: 13
  }
});

VideoPlayer.propTypes = {
  playlistTitle: PropTypes.string,
  deleteVideo: PropTypes.func.isRequired,
  finishVideo: PropTypes.func.isRequired,
  getRelatedVideos: PropTypes.func.isRequired,
  startVideo: PropTypes.func.isRequired,
  current: PropTypes.shape({
    id: PropTypes.number.isRequired,
    startedAt: PropTypes.number,
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
  }),
};

VideoPlayer.defaultProps = {
  current: undefined,
  playlistTitle: '',
};

export default VideoPlayer;
