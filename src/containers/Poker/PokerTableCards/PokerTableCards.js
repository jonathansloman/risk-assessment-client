import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { PlayingCard, diamonds, spades, hearts, clubs } from '@karlandin/playing-cards';
import { connect } from 'react-redux';

class PokerTableCards extends Component {

    render() {
        return (
            	<React.Fragment>
                    {this.renderTableCards(this.props.table.cards)}
              	</React.Fragment>

        )
    }

      renderTableCards(cards) {
      	console.log("table cards: " + JSON.stringify(cards));
      	if (cards == null || cards.length !== 5 || cards[0] == null) {
      		return;
      	} else {
      		return (
  				  <React.Fragment>
   		          	<Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>Table Cards</Typography>
   		          	<Grid container spacing={3}>
   		          		{cards.map(this.renderCard)}
   		          	</Grid>
				  </React.Fragment>
                );
      	}
      }
      
      renderCard(card, index) {
    	    if (card === null) {
    	    	console.log("null card " + index);
    	   	 return ;
    	    } else {
    	    	console.log("got card " + index + ", " + JSON.stringify(card));

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
        table: state.table,
    }
}

// Promote component to container
export default connect(mapStateToProps)(PokerTableCards);



