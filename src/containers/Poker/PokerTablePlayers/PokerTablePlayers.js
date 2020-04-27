import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

class PokerTablePlayers extends Component {

    render() {
    	console.log('render pokerTablePlayers props is: ' + JSON.stringify(this.props))
        return (
            <React.Fragment>
            <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>Players</Typography>
            	<Grid container spacing={3}>
                    {this.renderTable(this.props.table)}
                </Grid>
            </React.Fragment>
                	

        )
    }
    
    renderTable(table) {  	
    	console.log('table is: ' + table);
        return table.players == null ? <Grid item xs><Paper>No Players</Paper></Grid> : table.players.map( (x, i) => renderPlayer(x, table.dealer, table.nextToBet, i));
    }    
}

function renderPlayer(player, dealer, nextToBet, index) {
    if (player == null) {
       return <Grid item xs><Paper>Empty Seat</Paper></Grid>
    } else if (index === nextToBet){
  	   return  <Grid item xs><Paper>{player.name} Chips: {player.chips}({player.buyIns}) Bet: {countBets(player.bets)} {playerStatus(player, index === dealer)}</Paper></Grid>

    } else {
 	   return  <Grid item xs><Paper>{player.name} Chips: {player.chips}({player.buyIns}) Bet: {countBets(player.bets)} {playerStatus(player, index === dealer)}</Paper></Grid>
    }
  }
    
function countBets(bets) {
  if (bets == null || bets.length === 0) {
	  return 0;  	
  } else {
	  return bets.reduce((a, b) => a + b, 0);
  }
}
    

// Whatever is returned is going to show up as props 
function mapStateToProps(state) {
    return {
        table: state.table,
        thisUser: state.thisUser,
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
export default connect(mapStateToProps)(PokerTablePlayers);



