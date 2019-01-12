import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TextInput, Button, TouchableHighlight } from 'react-native';
import { sendLoginRequest, toggleRegisterWindow } from '../../actions';
import styled from 'styled-components/native';

const mapDispatchToProps = dispatch => ({
  onOpenRegisterClick: () => {
    dispatch(toggleRegisterWindow());
  },
  onSubmit: (username, password) => {
    dispatch(sendLoginRequest(username, password));
  },
});
const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  error: state.auth.loginError,
});

const LoginWrapper = styled.View`
  backgroundColor: white
  padding: 10px
`

const StyledTextInput = styled.TextInput`
  backgroundColor: #f7f9f9
  borderColor: #d9e0e2
  borderWidth: 1px
  borderStyle: solid
  width: 100%
  height: 35px
  borderRadius: 3px
  fontSize: 13px
  lineHeight: 13px
  padding: 10px
  marginBottom: 7px
`

const Label = styled.Text`
  fontWeight: 700
  fontSize: 13px
  color: #3e414c
  lineHeight: 24px
`

const StyledButton = styled.TouchableOpacity`
  height: 38px;
  line-height: 38px;
  padding: 0 10px;
  font-size: 13px;
  font-weight: 700;
  border: 0;
  border-radius: 5px;
  margin-bottom: 2px;
  margin-right: 2px;
  color: #fff;
  background: #b1bb00;
  box-shadow: 2px 2px 0 #9fa800;
`

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.username, this.state.password);
    this.setState({
      username: '',
      password: '',
    });
  }

  render() {
    return (
      <LoginWrapper>
        <Label>Username</Label>
        <StyledTextInput
          onChangeText={(text) => this.setState({username: text})}
          value={this.state.username}
          autoCapitalize="none"
          placeholder="Username"
        />
        <Label>Password</Label>
        <StyledTextInput
          onChangeText={(text) => this.setState({password: text})}
          value={this.state.password}
          autoCapitalize="none"
          placeholder="Password"
        />
        <Button color="#b1bb00" onPress={this.handleSubmit} title="Login" ></Button>
      </LoginWrapper>
    );
  }
}

Login.propTypes = {
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onOpenRegisterClick: PropTypes.func.isRequired,
};

Login.defaultProps = {
  error: undefined,
};

const styles = StyleSheet.create({
  login: {
    backgroundColor: 'white',
    padding: 10
  },
  input: {
    backgroundColor: '#f7f9f9',
    borderColor: '#d9e0e2',
    borderWidth: 1,
    borderStyle: 'solid',
    width: '100%',
    height: 35,
    borderRadius: 3,
    fontSize: 13,
    lineHeight: 13,
    padding: 10,
    marginBottom: 7
  },
  label: {
    fontWeight: '700',
    fontSize: 13,
    color: '#3e414c',
    lineHeight: 24
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
