import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-native';
import Login from './Login';
import { StyleSheet, Text, View, Image, Button,TouchableHighlight, TextInput, Platform } from 'react-native';
import styled from 'styled-components/native';

import {
  toggleLoginWindow,
  toggleCreatePlaylistWindow,
  toggleRegisterWindow,
  toggleLogoutWindow,
  logOut,
  createPlaylist,
  verifyToken,
  getUserDataFromStorage
} from '../../actions';


const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  username: state.auth.username,
  loggedIn: state.auth.loggedIn,
  loginOpen: state.windows.loginOpen,
  registerOpen: state.windows.registerOpen,
  logoutOpen: state.windows.logoutOpen,
  createPlaylistOpen: state.windows.createPlaylistOpen,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  verifyToken: () => {
    dispatch(verifyToken());
  },
  onOpenLoginClick: () => {
    dispatch(toggleLoginWindow());
  },
  getUserDataFromStorage: () => {
    dispatch(getUserDataFromStorage());
  },
  onOpenRegisterClick: () => {
    dispatch(toggleRegisterWindow());
  },
  onOpenLogoutClick: () => {
    dispatch(toggleLogoutWindow());
  },
  onOpenCreatePlaylistClick: () => {
    dispatch(toggleCreatePlaylistWindow());
  },
  onLogoutClick: () => {
    dispatch(logOut());
  },
  onCreatePlaylistSubmit: (title, description) => {
    dispatch(createPlaylist(title, description, ownProps.history));
  },
});

const HeaderWrapper = styled.View`
  height: ${Platform.OS === 'ios' ? '70px' : '50px'}
  width: 100%
  backgroundColor: #212121
  borderBottomColor: #666
  borderStyle: solid
  borderBottomWidth: 1
  flexDirection: row
  paddingTop: ${Platform.OS === 'ios' ? '20px': '0px'}
  zIndex: 40
  display: flex
  flexDirection: row
  justifyContent: space-between
`

const Home = styled.View` 
  display: flex
  flexDirection: row
`
const Logo = styled.Image`
  width: 34px
  height: 40px
  marginTop: 5px
  marginLeft: 10px
  marginRight: 10px
`

const User = styled.Text`
  color: #ffffff
  lineHeight: 50px
`

const Dropdown = styled.TouchableHighlight`
  width: 24px
  height: 24px
  alignSelf: center
`
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {opened: false};
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }
  toggleDropdown() {
    this.setState({
      opened: !this.state.opened
    })
  }
  componentDidMount() {
    this.props.getUserDataFromStorage();
  }
  render() {
    return (
      <View>
        <HeaderWrapper>
          <Link to='/'>
            <Home>
              <Logo
                source={require('../../img/logo.png')}
              />
              <User>Balistos</User>
            </Home>
          </Link>
          <User>{this.props.username}</User>
          <Dropdown onPress={this.toggleDropdown}>
            <Image  source={require('../../img/dropdown.png')} />
          </Dropdown> 
        </HeaderWrapper>      
        {this.state.opened && <Login />}
      </View>
    );
  }
}

/*
class Header extends React.Component {
  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.verifyToken();
    }
  }
  render() {
    return (
      <header>
        <div className="container">
          <Link to="/">
            <h1 className="logo">Balistos</h1>
          </Link>
          {this.props.loggedIn ?
            <div>
              <UserMenu
                onOpenLogoutClick={this.props.onOpenLogoutClick}
                onOpenCreatePlaylistClick={this.props.onOpenCreatePlaylistClick}
                username={this.props.username}
                loggedIn={this.props.loggedIn}
              />
              {this.props.logoutOpen ? <LogOut
                onLogoutClick={this.props.onLogoutClick}
              /> : undefined}

              {this.props.createPlaylistOpen ? <CreatePlaylist
                onCreatePlaylistSubmit={this.props.onCreatePlaylistSubmit}
              /> : undefined}
            </div> :
            <div>
              <UserMenu
                onOpenLoginClick={this.props.onOpenLoginClick}
                onOpenRegisterClick={this.props.onOpenRegisterClick}
                username={this.props.username}
                loggedIn={this.props.loggedIn}
              />
              {this.props.loginOpen ? <Login /> : undefined}
              {this.props.registerOpen ? <Register /> : undefined }
            </div>
          }
        </div>
        <div className="clearfix" />
      </header>
    );
  }
}

Header.propTypes = {
  verifyToken: PropTypes.func.isRequired,
  onOpenLoginClick: PropTypes.func.isRequired,
  onOpenRegisterClick: PropTypes.func.isRequired,
  onOpenLogoutClick: PropTypes.func.isRequired,
  onCreatePlaylistSubmit: PropTypes.func.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
  createPlaylistOpen: PropTypes.bool,
  logoutOpen: PropTypes.bool.isRequired,
  registerOpen: PropTypes.bool,
  loginOpen: PropTypes.bool,
  onOpenCreatePlaylistClick: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool,
  username: PropTypes.string,
};

Header.defaultProps = {
  registerOpen: false,
  username: undefined,
  loggedIn: false,
  createPlaylistOpen: false,
  logoutOpen: false,
  loginOpen: false,
};
*/

export default connect(mapStateToProps, mapDispatchToProps)(Header);
