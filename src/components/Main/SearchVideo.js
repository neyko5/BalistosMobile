import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchYoutube, addVideo, updateSearchIndex, clearYoutubeResults, resetYoutubeSearchQuery } from '../../actions';
import VideoResult from './VideoResult';
import { TextInput, Text, View, StyleSheet } from 'react-native';


const mapDispatchToProps = dispatch => ({
  searchYoutube: (query) => {
    dispatch(searchYoutube(query));
  },
  addVideo: (id, title, playlistId) => {
    dispatch(addVideo(id, title, playlistId));
  },
  clearYoutubeResults: () => {
    dispatch(clearYoutubeResults());
  },
  resetYoutubeSearchQuery: () => {
    dispatch(resetYoutubeSearchQuery());
  },
});

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  results: state.results.youtube,
  query: state.results.query,
  index: state.results.youtubeIndex,
});

class SearchVideo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.search}>
        <TextInput style={styles.input}
          placeholder="Search for YouTube video and add to playlist"
          onChangeText={this.props.searchYoutube}
          value={this.props.query || ''}
          autoComplete="off"
        />
        {this.props.results && this.props.query ? <View style={styles.results}>
          {this.props.results.map((result, index) =>
            (<VideoResult
              title={result.snippet.title}
              image={result.snippet.thumbnails.default.url}
              onItemClick={() => this.props.addVideo(result.id.videoId,
                result.snippet.title, this.props.id)}
              id={result.id.videoId}
              key={result.id.videoId}
            />),
          )}
        </View> : undefined }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  search: {
    width: '100%',
    padding: 5,
    zIndex: 2
  },
  input: {
      width: '100%',
      height: 40,
      borderRadius: 0,
      lineHeight: 18,
      fontSize: 13,
      color: '#333333',
      backgroundColor: '#ffffff',
      paddingHorizontal: 10,
      paddingVertical: 11,
      margin: 0
  },
  results: {
      backgroundColor: '#ffffff',
      zIndex: 20,
      backgroundColor: '#f6f6f6',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#cccccc',
      borderRadius: 3,
      padding: 0,
      width: '100%',
      flexGrow: 1
  }
});



SearchVideo.propTypes = {
  query: PropTypes.string,
  addVideo: PropTypes.func.isRequired,
  searchYoutube: PropTypes.func.isRequired,
  resetYoutubeSearchQuery: PropTypes.func.isRequired,
  clearYoutubeResults: PropTypes.func.isRequired,
  id: PropTypes.number,
  results: PropTypes.arrayOf(
    PropTypes.shape({
      snippet: PropTypes.object.isRequired,
      id: PropTypes.object.isRequired,
    }),
  ).isRequired,
};

SearchVideo.defaultProps = {
  query: '',
  id: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchVideo);
