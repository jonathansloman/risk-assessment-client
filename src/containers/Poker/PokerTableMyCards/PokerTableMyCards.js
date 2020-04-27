import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { PlayingCard, diamonds, spades, hearts, clubs } from '@karlandin/playing-cards';


import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';

class PokerTableMyCards extends Component {
	


    render() {
        return (
            	<React.Fragment>
                    {this.renderPlayerCards(this.props.cards)}
                </React.Fragment>

        )
    }
    
    renderPlayerCards(cards) {
    	console.log(cards);
    	if (cards == null || cards.length !== 2 || cards[0] == null) {
    		return;
    	} else {
    		return (
  				  <React.Fragment>
    		         <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>My Cards</Typography>

               	  <Grid container spacing={3}>
                      {cards.map(this.renderCard)}
                  </Grid>
				  </React.Fragment>

              );
    	}
    }
    
    renderCard(card, index) {
        if (card == null) {
       	 return ;
        } else {
       	 return <Grid item xs><PlayingCard card={getCard(card)} size="small"/></Grid>
        }
                       	
    }


}

    
function getCard(card) {
	var value;
	if (card.value === 14) {
		value = 0;
	} else {
		value = card.value - 1;
	}
	if (card.suit === 'SPADES') {
		return spades[value];
	} else if (card.suit === 'DIAMONDS') {
		return diamonds[value];
	} else if (card.suit === 'HEARTS') {
		return hearts[value];
	} else {
		return clubs[value];
	}
}


function mapStateToProps(state) {
    return {
        cards: state.cards
    }
}

// Promote component to container
export default connect(mapStateToProps)(PokerTableMyCards);



