import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import CheckCircle from 'material-ui-icons/CheckCircle';
import { connect } from 'react-redux';

class ChatHistory extends Component {

    render() {
        const style = {
            backgroundColor: '#eaeaea',
            padding: 15,
            height: '420px',
            overflowY: 'scroll',
            display: 'flex',
            flexDirection: 'column'
        };

        const msgs = this.props.messages.map((message, i) =>
            this.renderMessages(message, i)
        );

        return (
        		<div>
        		<div style={{ textAlign: 'left' }}>
                <Drawer width={200} docked={true}>
                    <AppBar title="Players" showMenuIconButton={false} />
                    {this.renderTable()}
                </Drawer>
            </div>
            <div style={style}>
                {msgs}
            </div>
            </div>
        )
    }

    renderMessages(message, i) {
        const style = {
            display: 'block',
            margin: '5px 0'
        };

        const isMe = this.props.thisUser === message.playerName;
        const floatDirection = isMe ? 'right' : 'left'
        const nameColor = isMe ? 'green' : 'red';
        const margin = isMe ? ' 0 0 0 40px' : '0 40px 0 0 ';

        const textStyle = {
            float: floatDirection,
            backgroundColor: '#fff',
            padding: '6px 10px',
            borderRadius: '15px',
            margin: margin,
            textAlign: 'left'
        }

        const nameStyle = {
            color: nameColor,
            float: floatDirection
        }

        return (
            <div key={i} style={style}>
                <span style={textStyle}>
                    <span style={nameStyle}>{message.playerName}</span>
                    <br />
                    {message.data}
                </span>
            </div>
        );
    }
    renderTable() {
       	
  	  
  //      return this.props.table.players.map(player => player == null ? 
  //          <MenuItem key='empty' leftIcon={<CheckCircle color={"#2BB673"} />}>Empty Seat</MenuItem>
  //      		:
   //         <MenuItem key={player.name} leftIcon={<CheckCircle color={"#2BB673"} />}> {player.name} {player.chips} </MenuItem>
    	return <MenuItem key='empty' leftIcon={<CheckCircle color={"#2BB673"} />}>blah</MenuItem>
  //      );
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
export default connect(mapStateToProps)(ChatHistory);



