import React, { Component } from 'react';
import { connect } from 'react-redux';

class EventHistory extends Component {

    render() {
        const style = {
            backgroundColor: '#eaeaea',
            padding: 15,
            height: '220px',
            overflowY: 'scroll',
            display: 'flex',
            flexDirection: 'column'
        };
// we reverse the order so most recent first
        const msgs = this.props.messages.slice(0).reverse().map((message, i) =>
            this.renderMessages(message, i)
        );
        console.log('Calling render')
        return (
            <div style={style}>
                {msgs}
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
    
}

// Whatever is returned is going to show up as props inside UserList
function mapStateToProps(state) {
    return {
        messages: state.messages,
        table: state.table,
        thisUser: state.thisUser,
        cards: state.cards
    }
}

// Promote component to container
export default connect(mapStateToProps)(EventHistory);



