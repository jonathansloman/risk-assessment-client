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
        console.log('Calling render')
        return (
        		<div>
        		<div style={{ textAlign: 'left' }}>
                <Drawer width={300} docked={true}>
                    {this.renderPlayerCards(this.props.cards)}
                    {this.renderTableCards(this.props.table.cards)}
                    <AppBar title="Players" showMenuIconButton={false} />
                    {this.renderTable(this.props.table)}
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
    
    renderTable(table) {  	
    	console.log(table);
        return table.players == null ? <MenuItem>No Players</MenuItem> : table.players.map(renderPlayer);
    }
    
    renderPlayerCards(cards) {
    	console.log(cards);
    	if (cards == null || cards.length !== 2 || cards[0] == null) {
    		return;
    	} else {
    		return (
            		<div style={{ textAlign: 'left' }}>

              <AppBar title="Your Cards" showMenuIconButton={false} />
              {cards.map(renderCard)}
              </div>
              );
    	}
    }

      renderTableCards(cards) {
      	console.log(cards);
      	if (cards == null || cards.length !== 5 || cards[0] == null) {
      		return;
      	} else {
      		return (
              		<div style={{ textAlign: 'left' }}>

                <AppBar title="Table Cards" showMenuIconButton={false} />
                {cards.map(renderCard)}
                </div>
                );
      	}
      }
 
     
}

function renderPlayer(player, index) {
    if (player == null) {
       return <MenuItem key={index} leftIcon={<CheckCircle color={"#2BB673"} />}>Empty Seat</MenuItem>
    } else {
 	   return  <MenuItem key={player.name} leftIcon={<CheckCircle color={"#2BB673"} />}> {player.name} Chips: {player.chips} Bet: {player.bet}</MenuItem>
    }
  }
    
function renderCard(card) {
    if (card == null) {
   	 return ;
    } else {
   	 return <MenuItem key="key" leftIcon={<CheckCircle color={"#2BB673"} />}>{cardToText(card)}</MenuItem>
    }
                   	
}

    function cardToText(card) {
    	if (card.value == 1) {
    		return 'A of ' + card.suit;
        } else if (card.value <= 10) {
        	return card.value + ' of ' + card.suit;
    	} else if (card.value == 11) {
    		return 'J of ' + card.suit;
    	} else if (card.value == 12) {
    		return 'Q of ' + card.suit;
    		
    	} else if (card.value == 13) {
    		return 'K of ' + card.suit;
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
export default connect(mapStateToProps)(ChatHistory);



