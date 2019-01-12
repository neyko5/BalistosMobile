import React from 'react';
import SearchPlaylistContainer from './SearchPlaylistContainer';
import PopularPlaylistContainer from './PopularPlaylistContainer';
import { View, Text, StyleSheet } from 'react-native';

const Home = () => (
  <View>
    <Text style={styles.mainTitle}>Share your music taste with your friends!</Text>
    <SearchPlaylistContainer />
    <Text style={styles.subTitle}>Popular playlists</Text>
    <PopularPlaylistContainer />
  </View>
);

const styles = StyleSheet.create({
  mainTitle: {
    textAlign: 'center',
    fontSize: 20,
    paddingVertical: 10,
  },
  subTitle: {
    textAlign: 'center',
    fontSize: 16,
    paddingVertical: 8,
  },
});
  

export default Home;
