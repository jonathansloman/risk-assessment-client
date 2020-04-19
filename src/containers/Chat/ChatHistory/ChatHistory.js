import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import CheckBoxOutlineBlank from 'material-ui-icons/CheckBoxOutlineBlank';
import CheckBox from 'material-ui-icons/CheckBox';
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
// we reverse the order so most recent first
        const msgs = this.props.messages.slice(0).reverse().map((message, i) =>
            this.renderMessages(message, i)
        );
        console.log('Calling render')
        return (
        		<div>
        		<div style={{ textAlign: 'left' }}>
                <Drawer width={350} docked={true}>
                    {this.renderPlayerCards(this.props.cards)}
                    {this.renderTableCards(this.props.table.cards)}
                    {this.renderTablePots(this.props.table.pots, this.props.table.numPots)}
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
        return table.players == null ? <MenuItem>No Players</MenuItem> : table.players.map( (x, i) => renderPlayer(x, table.dealer, table.nextToBet, i));
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
      
      renderTablePots(pots, numpots) {
    	  console.log(pots);
    	  if (pots == null || pots.length === 0 || pots[0].pot === 0) {
    		  return;
    	  } else {
    		  return(
               		<div style={{ textAlign: 'left' }}>

                    <AppBar title="Pots" showMenuIconButton={false} />
                    {pots.map(renderPot)}
                    </div>  				  
    		  );
    		  
    	  }
      }
 
     
}

function renderPlayer(player, dealer, nextToBet, index) {
    if (player == null) {
       return <MenuItem key={index}>Empty Seat</MenuItem>
    } else if (index === nextToBet){
  	   return  <MenuItem key={player.name} leftIcon={<CheckBox color={"#2BB673"} />}> {player.name} Chips: {player.chips}({player.buyIns}) Bet: {countBets(player.bets)} {playerStatus(player, index === dealer)}</MenuItem>

    } else {
 	   return  <MenuItem key={player.name} leftIcon={<CheckBoxOutlineBlank color={"#2BB673"} />}> {player.name} Chips: {player.chips}({player.buyIns}) Bet: {countBets(player.bets)} {playerStatus(player, index === dealer)}</MenuItem>
    }
  }
    
function renderCard(card, index) {
    if (card == null) {
   	 return ;
    } else {
   	 return <MenuItem key="card-{index}">{cardToText(card)}</MenuItem>
    }
                   	
}

function countBets(bets) {
  if (bets == null || bets.length === 0) {
	  return 0;  	
  } else {
	  return bets.reduce((a, b) => a + b, 0);
  }
}

function renderPot(pot, index) {
	if (pot == null || pot.pot === 0) {
		return;
	} else {
		
	// TODO show players involved in each sidepot
	   	 return <MenuItem key="key-{ index }" >pot{index + 1} -> {pot.pot}</MenuItem>

	}
}
    
function cardToText(card) { 	
    if (card.value <= 10) {
    	return card.value + ' of ' + card.suit;
	} else if (card.value === 11) {
		return 'J of ' + card.suit;
	} else if (card.value === 12) {
		return 'Q of ' + card.suit;
		
	} else if (card.value === 13) {
		return 'K of ' + card.suit;
	} else if (card.value === 14) {
		return 'A of ' + card.suit;
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

function playerStatus(player, isdealer) {
  if (player.folded) {
	  return "(folded)" + (isdealer ? "(dealer)" : "");	
  } else if (player.allIn) {
	  return "(all in)" + (isdealer ? "(dealer)" : "");
  } else if (player.paused) {
	  return "(paused)" + (isdealer ? "(dealer)" : "");
  } else if (isdealer) {
	  return "(dealer)";
  }
}

// Promote component to container
export default connect(mapStateToProps)(ChatHistory);



