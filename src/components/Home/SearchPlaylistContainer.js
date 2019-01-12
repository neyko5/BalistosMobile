import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import SearchPlaylistResult from './SearchPlaylistResult';
import { searchPlaylists } from '../../actions';


const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  results: state.results.playlists,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSearchInputChange: (query) => {
    dispatch(searchPlaylists(query));
  },
});

class SearchPlaylistContainer extends React.Component {
  constructor(props) {
    super(props);

    this.props.onSearchInputChange = this.props.onSearchInputChange.bind(this);
  }
  render() {
    return (
      <View style={styles.searchPlaylist}>
        <View style={styles.inner}>
          <TextInput type="text" autoCapitalize="none" style={styles.input} placeholder="Search playlist" onChangeText={(event) => this.props.onSearchInputChange(event)} />
          <View style={styles.searchIcon}><Image style={styles.searchIconImage} source={require('../../img/search.png')} /></View>
        </View>
        {this.props.results.length ? <View style={styles.playlistResults}>
          {this.props.results.map(result => <SearchPlaylistResult key={result.id} result={result} />)}
        </View>: undefined }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  searchPlaylist: {
    width: '100%',
    height: 55,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 2
  },
  searchIcon: {
    width: 54,
    height: 36,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: '#000000',
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: '#dddddd',
    paddingHorizontal: 15, 
    paddingVertical: 6
    
  },
  searchIconImage: {
    width: 24,
    height: 24
    
  },
  inner: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  input: {
    borderRadius: 3,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 1,
    borderColor: '#000000',
    borderStyle: 'solid',
    lineHeight: 36,
    backgroundColor: '#f7f9f9',
    height: 36,
    paddingHorizontal: 10,
    flexGrow: 1
  },
  playlistResults: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderStyle: 'solid',
    borderRadius: 3
  }
});
  

SearchPlaylistContainer.propTypes = {
  onSearchInputChange: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPlaylistContainer);
