import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Singleton from '../../../socket';
import MessageType from './MessageType';

import { connect } from 'react-redux';

class SendMessage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            inputValue: ''
        }
    }

    render() {

        if(!this.props.thisUser) return '';

        const styles = {
            position: 'absolute',
            bottom: 0,
            width: '100%'
        };
        const fieldStyle = {
            width: '70%'
        };
        const btnStyles = {
            marginLeft: 25
        };

        return (
            <div style={styles}>
                <TextField
                    label="Write message here.."
                    fullWidth={true}
                    style={fieldStyle}
                    value={this.state.inputValue}
                    onChange={this.updateInputValue.bind(this)}
                    onKeyPress={this.handleKeyPress}
                    autoFocus
                />
                <Button variant="contained" style={btnStyles} onClick={this.sendMessage.bind(this)} > Send </Button>
            </div>
        );
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.sendMessage();
        }
    }

    sendMessage() {
        const socket = Singleton.getInstance();
        let messageDto = JSON.stringify({ playerName: this.props.thisUser, data: this.state.inputValue, type: MessageType.TEXT_MESSAGE });
        socket.send(messageDto);
        this.setState({ inputValue: '' })
    }

    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value
        })
    }
}

// Whatever is returned is going to show up as props inside UserList
function mapStateToProps(state) {
    return {
        messages: state.messages,
        table: state.table,
        thisUser: state.thisUser
    }
}

// Promote component to container
export default connect(mapStateToProps)(SendMessage);



