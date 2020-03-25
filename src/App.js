import React, { Component } from 'react';
import './App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import UserList from './containers/UserList/UserList';
import Chat from './containers/Chat/Chat';
import Singleton from './socket';
import MessageType from './containers/Chat/SendMessage/MessageType';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { connect } from 'react-redux';
import { userJoined, userJoinedAck, userLeft, messageReceived } from './actions/index';
import { bindActionCreators } from 'redux';

class App extends Component {
  constructor() {
    super();

    this.state = {
      modalOpen: true,
      usernameInput: '',
      passwordInput: ''
    }
  }

  render() {
    const modalActions = [
      <RaisedButton
        label="Choose"
        primary={true}
        onClick={() => this.onChooseName()}
      />
    ];

    const modalStyle = {
      width: '600px'
    };

    const chat = this.state.modalOpen ? '' : <Chat />

    return (
      <MuiThemeProvider>
        <div className="App">
          <UserList table={this.state.table} />
          {chat}
          <Dialog
            title="Choose your name"
            actions={modalActions}
            modal={true}
            open={this.state.modalOpen}
            contentStyle={modalStyle}>
            <TextField
              autoFocus
              hintText="Write your name here..."
              value={this.state.usernameInput}
              onChange={(event) => this.updateInputValue(event.target.value)}
              onKeyPress={this.handleKeyPress}
            />
            <TextField
              hintText="Password ..."
              value={this.state.passwordInput}
              onChange={(event) => this.updatePasswordValue(event.target.value)}
              onKeyPress={this.handleKeyPress}
            />
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }

  registerSocket() {
    let self = this;
    this.socket = Singleton.getInstance();

    this.socket.onmessage = (response) => {
      let message = JSON.parse(response.data);
      let table;

      switch (message.type) {
        case MessageType.TEXT_MESSAGE:
          table = message.table;
          self.props.messageReceived(message, table);
          break;
        case MessageType.PLAYER_JOINED:
          table = message.table;
          self.props.userJoined(table);
          break;
        case MessageType.PLAYER_LEFT:
          table = message.table;
          self.props.userLeft(table);
          break;
        case MessageType.PLAYER_JOINED_ACK:
          let thisUser = message.playerName;
          self.props.userJoinedAck(thisUser);
          break;
        case MessageType.PLAYER_OVERRIDDEN:
        	// notify user somehow?
        	break;
        case MessageType.PLAYER_BADPASSWORD:
        	// notify user somehow?
        	break;
        default:
      }
    }

    this.socket.onopen = () => {
      this.sendJoinedMessage();
    }

    window.onbeforeunload = () => {
      let messageDto = JSON.stringify({ player: this.props.thisUser, type: MessageType.PLAYER_LEFT });
      this.socket.send(messageDto);
    }
  }

  sendJoinedMessage() {
	var newPlayerObj = { name: this.state.usernameInput, password: this.state.passwordInput }
    let messageDto = JSON.stringify({ newPlayer: newPlayerObj, type: MessageType.PLAYER_JOINED });
    this.socket.send(messageDto);
  }

  onChooseName() {
    this.registerSocket();
    this.setState({ modalOpen: false });
  }

  updateInputValue(value) {
    this.setState({ usernameInput: value });
  }
  
  updatePasswordValue(value) {
	    this.setState({ passwordInput: value });
	}

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.onChooseName();
    }
  }
}

function mapStateToProps(state) {
  return {
    messages: state.message,
    table: state.table,
    thisUser: state.thisUser
  }
}

function mapDispatchToProps(dispatch, props) {
  return bindActionCreators({
    userJoined: userJoined,
    userJoinedAck: userJoinedAck,
    userLeft: userLeft,
    messageReceived: messageReceived
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);