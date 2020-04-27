import React, { Component } from 'react';
import './App.css';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
//import UserList from './containers/UserList/UserList';
import PokerTable from './containers/Poker/PokerTable';
import Singleton from './socket';
import MessageType from './containers/Poker/SendMessage/MessageType';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
      <Button
      	variant="contained"
        label="Choose"
        primary={true}
        onClick={() => this.onChooseName()}
      />
    ];

    const pokerTable = this.state.modalOpen ? '' : <PokerTable />
    const loginModal = this.state.modalOpen ? <Dialog
            title="Choose your name"
                actions={modalActions}
                open={this.state.modalOpen}
                maxWidth='sm'
               >
                <DialogTitle>Choose your name</DialogTitle>
                <DialogContent>
                <TextField
                  autoFocus
                  label="Write your name here..."
                  value={this.state.usernameInput}
                  onChange={(event) => this.updateInputValue(event.target.value)}
                  onKeyPress={this.handleKeyPress}
                />
                <TextField
                  label="Password ..."
                  value={this.state.passwordInput}
                  onChange={(event) => this.updatePasswordValue(event.target.value)}
                  onKeyPress={this.handleKeyPress}
                />
               </DialogContent>
              </Dialog> : ''

    return (
      <MuiThemeProvider>
        <div className="App">
          {pokerTable}
          {loginModal}
        </div>
      </MuiThemeProvider>
    );
  }

  registerSocket() {
    let self = this;
    this.socket = Singleton.getInstance();

    this.socket.onmessage = (response) => {
      let message = JSON.parse(response.data);

      switch (message.type) {
        case MessageType.TEXT_MESSAGE:
          self.props.messageReceived(message, message.table, message.cards);
          break;
        case MessageType.PLAYER_JOINED:
          self.props.userJoined(message.table);
          break;
        case MessageType.PLAYER_LEFT:
          self.props.userLeft(message.table);
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