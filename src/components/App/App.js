import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NativeRouter, Route } from 'react-router-native';

import Header from '../Header/Header';
import Home from '../Home/Home';
import Playlist from '../Main/Playlist';
import { closeAllWindows } from '../../actions';

import { View, Dimensions, Platform, YellowBox } from 'react-native';

const mapDispatchToProps = dispatch => ({
  clickOutside: () => {
    dispatch(closeAllWindows());
  },
});

YellowBox.ignoreWarnings([
    'Remote debugger',
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);
console.log(Dimensions.get('window').height);

const App = props => (
    <NativeRouter>
      <View style={{display: 'flex', height: Dimensions.get("window").height - (Platform.OS === 'ios' ? 0 : 24), flexDirection: 'column'}}>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/playlist/:playlistId" component={Playlist} />
      </View>
    </NativeRouter>
);

App.propTypes = {
  clickOutside: PropTypes.func.isRequired,
};

export default connect(undefined, mapDispatchToProps)(App);

