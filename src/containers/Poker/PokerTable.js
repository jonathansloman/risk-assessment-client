import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import EventHistory from './EventHistory/EventHistory';
import PokerTablePlayers from './PokerTablePlayers/PokerTablePlayers';
import PokerTablePots from './PokerTablePots/PokerTablePots';
import PokerTableCards from './PokerTableCards/PokerTableCards';
import PokerTableMyCards from './PokerTableMyCards/PokerTableMyCards';
import SendMessage from './SendMessage/SendMessage';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';



class PokerTable extends Component {
    render() {
        const styles = {
            height: 340,
            width: 300,
            textAlign: 'center',
            margin: '20px auto',
            position: 'relative'
        };
        console.log('In pokertable render')
        return (
        	<React.Fragment>
        	  <Grid container spacing={3}>
        	    <Grid item xs>
                  <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
                    Risk Assessment Poker
                  </Typography>
                  <Typography variant="h5" align="center" color="textSecondary" component="p">
                    Commands are: sit, deal, raise #, call, check, fold, buyin
                  </Typography>
                </Grid>
              <Grid item xs>
                <PokerTablePlayers />
              </Grid>
              <Grid item xs>
                <PokerTablePots />
              </Grid>
              <Grid item xs>
                <PokerTableCards />
              </Grid>
              <Grid item xs>
                <PokerTableMyCards />
              </Grid>
              <Grid item xs>
                <Paper style={styles} zdepth={2} >
                  <EventHistory />
                  <Divider />
                  <SendMessage />
                </Paper>
              </Grid>
            </Grid>
          </React.Fragment>
        );
    }
//  <PokerTablePlayers />
//  <PokerTablePots />
//  <PokerTableCards />
//  <PokerTableMyCards />
}

export default PokerTable;

