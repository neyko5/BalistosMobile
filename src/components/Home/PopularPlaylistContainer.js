import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PopularPlaylist from './PopularPlaylist';
import { fetchPopularPlaylists } from '../../actions';

function mapStateToProps(state) {
  return {
    playlists: state.results.popular,
  };
}

const mapDispatchToProps = dispatch => ({
  fetchPopularPlaylists: () => {
    dispatch(fetchPopularPlaylists());
  },
});

class PopularPlaylistContainer extends React.Component {
  componentWillMount() {
    this.props.fetchPopularPlaylists();
  }
  render() {
    return (
        <ScrollView style={styles.playlistScroll}> 
          {this.props.playlists
            .map((result, index) =>
              <PopularPlaylist data={result} index={index} key={result.id} />)}
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  playlistScroll: {
    height: 290
  }
});

PopularPlaylistContainer.propTypes = {
  fetchPopularPlaylists: PropTypes.func.isRequired,
  playlists: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PopularPlaylistContainer);
